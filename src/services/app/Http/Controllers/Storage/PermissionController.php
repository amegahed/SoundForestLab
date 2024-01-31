<?php
/******************************************************************************\
|                                                                              |
|                            PermissionController.php                          |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a controller for manipulating file system permissions.        |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|            Copyright (C) 2016-2020, Sharedigm, www.sharedigm.com             |
\******************************************************************************/

namespace App\Http\Controllers\Storage;

use Illuminate\Http\Request;
use App\Models\Storage\Linking\Link;
use App\Models\Users\User;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Storage\Linking\LinkController;

class PermissionController extends Controller
{
	//
	// querying methods
	//

	/**
	 * Get the current owner.
	 *
	 * @param Illuminate\Http\Request $request - the Http request object
	 * @return App\Models\Users\User
	 */
	public static function getOwner(Request $request) {
		$link = LinkController::current($request);
		if ($link) {
			return $link->user;
		} else {
			return User::current();
		}
	}

	/**
	 * Get the current group.
	 *
	 * @param Illuminate\Http\Request $request - the Http request object
	 * @return string
	 */
	public static function getGroup(Request $request) {
		$owner = self::getOwner($request);
		if ($owner && $owner->isCurrent()) {
			return 'owner';
		} else {
			return 'other';
		}
	}
}
