<?php
/******************************************************************************\
|                                                                              |
|                            VideoFileController.php                           |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This is a controller for file system video file information.          |
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
use App\Models\Storage\Media\VideoFile;
use App\Http\Controllers\Controller;

class VideoFileController extends Controller
{
	//
	// querying methods
	//

	/**
	 * Get a video file's contents.
	 *
	 * @param Illuminate\Http\Request $request - the Http request object
	 * @return Illuminate\Support\Facades\Response
	 */
	public function getVideo(Request $request) {
		
		// parse params
		//
		$path = $request->input('path');
		$volume = $request->input('volume');
		$linkId = $request->input('link_id');
		$shareId = $request->input('share_id');
		
		// create audio file
		//
		$videoFile = new VideoFile([
			'path' => $path,
			'volume' => $volume,
			'link_id' => $linkId,
			'share_id' => $shareId
		]);

		// check if file exists
		//
		if (!$videoFile->exists()) {
			return response("File '" . $path . "' not found.", 404);
		}

		$response = $videoFile->download();

		// allow video to play in browser
		//
		$response->headers->set('Content-Type', 'video/mp4');
		$response->headers->set('Content-Disposition', 'inline');

		return $response;
	}

	/**
	 * Get a video file's metadata tags.
	 *
	 * @param Illuminate\Http\Request $request - the Http request object
	 * @return object
	 */
	public function getTags(Request $request) {

		// parse params
		//
		$path = $request->input('path');
		$volume = $request->input('volume');
		$linkId = $request->input('link_id');
		$shareId = $request->input('share_id');
		
		// create audio file
		//
		$videoFile = new VideoFile([
			'path' => $path,
			'volume' => $volume,
			'link_id' => $linkId,
			'share_id' => $shareId
		]);

		// check if file exists
		//
		if (!$videoFile->exists()) {
			return response("File '" . $path . "' not found.", 404);
		}

		return $videoFile->tags;	
	}

	/**
	 * Get a video file's exif information.
	 *
	 * @param Illuminate\Http\Request $request - the Http request object
	 * @return object
	 */
	public function getExif(Request $request) {

		// parse params
		//
		$path = $request->input('path');
		$volume = $request->input('volume');
		$linkId = $request->input('link_id');
		$shareId = $request->input('share_id');

		// create image file
		//
		$videoFile = new VideoFile([
			'path' => $path,
			'volume' => $volume,
			'link_id' => $linkId,
			'share_id' => $shareId
		]);

		// check if file exists
		//
		if (!$videoFile->exists()) {
			return response("File '" . $path . "' not found.", 404);
		}

		// query image
		//
		return $videoFile->readExifTool();
	}
}