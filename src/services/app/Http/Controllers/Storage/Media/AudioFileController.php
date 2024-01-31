<?php
/******************************************************************************\
|                                                                              |
|                            AudioFileController.php                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a controller for file system audio file information.          |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|            Copyright (C) 2016-2020, Sharedigm, www.sharedigm.com             |
\******************************************************************************/

namespace App\Http\Controllers\Storage\Media;

use Illuminate\Http\Request;
use App\Models\Storage\Directory;
use App\Models\Storage\Media\AudioFile;
use App\Http\Controllers\Controller;

class AudioFileController extends Controller
{
	//
	// querying methods
	//

	/**
	 * Get an audio file's contents.
	 *
	 * @param Illuminate\Http\Request $request - the Http request object
	 * @return Illuminate\Support\Facades\Response
	 */
	public function getAudio(Request $request) {
		
		// parse params
		//
		$path = $request->input('path');
		$volume = $request->input('volume');
		$shareId = $request->input('share_id');
		$linkId = $request->input('link_id');

		// create audio file
		//
		$audioFile = new AudioFile([
			'path' => $path,
			'volume' => $volume,
			'share_id' => $shareId,
			'link_id' => $linkId
		]);

		// check if file exists
		//
		if (!$audioFile->exists()) {
			return response("File '" . $path . "' not found.", 404);
		}

		return $audioFile->download();
	}

	/**
	 * Get an audio file's id3 data.
	 *
	 * @param Illuminate\Http\Request $request - the Http request object
	 * @return string[]
	 */
	public function getId3(Request $request) {

		// parse params
		//
		$path = $request->input('path');
		$volume = $request->input('volume');
		$shareId = $request->input('share_id');
		$linkId = $request->input('link_id');

		// create audio file
		//
		$audioFile = new AudioFile([
			'path' => $path,
			'volume' => $volume,
			'share_id' => $shareId,
			'link_id' => $linkId
		]);

		// check if file exists
		//
		if (!$audioFile->exists()) {
			return response("File '" . $path . "' not found.", 404);
		}

		return $audioFile->id3;	
	}
}