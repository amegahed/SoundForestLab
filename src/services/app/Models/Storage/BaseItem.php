<?php
/******************************************************************************\
|                                                                              |
|                                 BaseItem.php                                 |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines an abstract superclass for file system files and         |
|        directories.                                                          |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|            Copyright (C) 2016-2020, Sharedigm, www.sharedigm.com             |
\******************************************************************************/

namespace App\Models\Storage;

use App\Models\BaseModel;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Cache;
use App\Models\Users\User;
use App\Models\Storage\Traits\Protectable;
use App\Models\Storage\Traits\MetadataAssociatable;
use App\Models\Storage\Traits\ItemGeolocatable;
use App\Utilities\Storage\UserStorage;
use App\Utilities\Strings\StringUtils;

class BaseItem extends BaseModel
{
	/**
	 * The traits that are inherited.
	 *
	 */
	use Protectable, MetadataAssociatable, ItemGeolocatable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [

		// file
		//
		'path',
		'volume'
	];

	/**
	 * The attributes that should be visible in serialization.
	 *
	 * @var array
	 */
	protected $visible = [

		// address
		//
		'path',
		'volume',

		// metadata
		//
		'place',

		// access control
		//
		'permissions',

		// timestamps
		//
		'created_at',
		'modified_at',
		'accessed_at'
	];

	/**
	 * The accessors to append to the model's array form.
	 *
	 * @var array
	 */
	protected $appends = [

		// metadata
		//
		'place',

		// access control
		//
		'permissions',

		// timestamps
		//
		'created_at',
		'modified_at',
		'accessed_at'
	];
	
	/**
	 * Storage cache
	 *
	 * @var array
	 */
	protected static $storage = [];

	//
	// querying methods
	//

	/**
	 * Find if this item is in the local file system.
	 *
	 * @return bool
	 */
	public function isLocal(): bool {
		return UserStorage::isLocal() && $this->volume == null;
	}

	/**
	 * Get this item's home directory.
	 *
	 * @return string
	 */
	public function homedir(): string {
		return UserStorage::current();
	}

	/**
	 * Get this item's full path relative to the storage root.
	 *
	 * @return string
	 */
	public function getPath(): string {
		if ($this->isLocal()) {
			return $this->fullPath();
		} else if ($this->volume) {
			return $this->path;
		} else {
			return $this->fullPath();
		}
	}

	/**
	 * Get this item's full path relative to the storage root.
	 *
	 * @return string
	 */
	public function fullPath(): string {
		return $this->homedir() . $this->path;
	}

	/**
	 * Get this item's path in the root file system.
	 *
	 * @return string
	 */
	public function rootPath(): string {
		return UserStorage::root() . $this->fullPath();
	}

	/**
	 * Get this item's temporary path.
	 *
	 * @return string
	 */
	public function tempPath(): string {
		return UserStorage::temp() . '/' . basename($this->path);
	}

	/**
	 * Temporarily copies this item to the local file system
	 *
	 * @return string
	 */
	public function toTemp(): string {

		// copy file to temp directory
		//
		$path = $this->tempPath();
		$this->putTo($path);

		// return path to item in temp directory
		//
		return $path;
	}

	/**
	 * Get volume for this item.
	 *
	 * @return \App\Models\Storage\Volume
	 */
	public function getVolume() {
		return new Volume([
			'path' => $this->volume
		]);
	}

	/**
	 * Get storage for this item.
	 *
	 * @return Illuminate\Filesystem\FilesystemAdapter
	 */
	public function getStorage() {
		if ($this->isLocal()) {
			return Storage::disk('local');
		} else if ($this->volume) {
			return $this->getVolume()->getStorage();
		} else {
			return Storage::disk(config('filesystems.default'));
		}
	}

	/**
	 * Find if this item exists in the file system.
	 *
	 * @return bool
	 */
	public function exists(): bool {

		// check which file system to use
		//
		if ($this->isLocal()) {

			// check if exists in local storage
			//
			return file_exists($this->rootPath());
		} else {

			// check if exists in remote storage
			//
			return $this->getStorage()->exists($this->getPath());
		}
	}

	//
	// updating methods
	//
	
	/**
	 * Move this item to a destination path.
	 *
	 * @param string $dest - the destination to move the item to.
	 * @return bool
	 */
	public function moveTo(string $dest): bool {
		
		// move item in storage
		//
		return $this->getStorage()->move($this->getPath(), $this->homedir() . $dest);
	}

	//
	// deleting methods
	//

	/**
	 * Delete this item.
	 *
	 * @return App\Models\Storage\Item
	 */
	public function delete() {
		
		// delete item in storage
		//
		return $this->getStorage()->delete($this->getPath());
	}
}