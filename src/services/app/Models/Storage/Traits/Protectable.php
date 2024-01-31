<?php
/******************************************************************************\
|                                                                              |
|                                Protectable.php                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a trait of a shareable storage system item.              |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|            Copyright (C) 2016-2020, Sharedigm, www.sharedigm.com             |
\******************************************************************************/

namespace App\Models\Storage\Traits;

use Illuminate\Support\Facades\Session;
use App\Utilities\Storage\Permissions;

trait Protectable
{
	//
	// access control accessor methods
	//

	/**
	 * Get this item's permissions attribute (in octal).
	 *
	 * @return string
	 */
	public function getPermissionsAttribute(): string {

		// check is item is part of shared directory
		//
		if ($this->isShared()) {
			return '444';

		// check which file system to use
		//
		} else if ($this->isLocal()) {

			// check if file exists
			//
			if (!$this->exists()) {
				return '755';
			}

			// get permissions from local storage
			//
			return substr(sprintf('%o', fileperms($this->rootPath())), -3);
		} else {

			/*
			// get permissions from cloud storage
			//
			$permissions = $this->getCustomMetadataValue('permissions');

			// return default permissions if not found
			//
			if (!$permissions) {
				return '755';
			}

			return $permissions;
			*/

			return '755';
		}
	}

	//
	// permission querying methods
	//

	/**
	 * Find if this item is readable by a group.
	 *
	 * @param string $group - the group to return permissions of.
	 * @return bool
	 */
	public function isReadableBy(string $group): bool {
		return Permissions::isReadable($this->permissions, $group);
	}

	/**
	 * Find if this item is writable by a group.
	 *
	 * @param string $group - the group to return permissions of.
	 * @return bool
	 */
	public function isWritableBy(string $group): bool {
		return Permissions::isWritable($this->permissions, $group);
	}

	/**
	 * Find if this item is executable by a group.
	 *
	 * @param string $group - the group to return permissions of.
	 * @return bool
	 */
	public function isExecutableBy(string $group): bool {
		return Permissions::isExecutable($this->permissions, $group);
	}
}
