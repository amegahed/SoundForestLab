<?php
/******************************************************************************\
|                                                                              |
|                                FileSystems.php                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines a model of a storage system file.                        |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|            Copyright (C) 2016-2020, Sharedigm, www.sharedigm.com             |
\******************************************************************************/

namespace App\Utilities\Storage;

use Illuminate\Filesystem\FilesystemAdapter;
use League\Flysystem\Filesystem;
use League\Flysystem\Ftp\FtpAdapter;
use League\Flysystem\Ftp\FtpConnectionOptions;
use League\Flysystem\PhpseclibV3\SftpAdapter;
use League\Flysystem\PhpseclibV3\SftpConnectionProvider;
use League\Flysystem\UnixVisibility\PortableVisibilityConverter;
use Aws\S3\S3Client as S3Client;
use League\Flysystem\AwsS3V3\AwsS3V3Adapter as S3Adapter;
use Spatie\Dropbox\Client as DropboxClient;
use Spatie\FlysystemDropbox\DropboxAdapter;
use Google_Service_Drive as GoogleServiceDrive;
use \Google\Client as GoogleClient;
use \Masbug\Flysystem\GoogleDriveAdapter;

class FileSystems
{
	//
	// file system driver methods
	//

	/**
	 * Get an FTP file system adapter
	 *
	 * @return bool
	 */
	public static function getFtpAdapter($attributes) {
		return new FtpAdapter(FtpConnectionOptions::fromArray([

			// options
			//
			'host' => $attributes['host'],
			'root' => $attributes['root'],
			'username' => $attributes['username'],
			'password' => $attributes['password'],

			// defaults
			//
			'port' => 21,
			'ssl' => false,
			'timeout' => 90,
			'utf8' => false,
			'passive' => true,
			'transferMode' => FTP_BINARY,
			'systemType' => null, 						// 'windows' or 'unix'
			'ignorePassiveAddress' => null, 			// true or false
			'timestampsOnUnixListingsEnabled' => false, // true or false
			'recurseManually' => true 					// true 
		]));
	}

	/**
	 * Get an SFTP file system adapter
	 *
	 * @return bool
	 */
	public static function getSftpAdapter($attributes) {
		return new SftpAdapter(
			new SftpConnectionProvider(
				$attributes['host'],
				$attributes['username'],
				$attributes['password'], 			
				null, 
				null, 
				$attributes['port'], 
				false, 
				60, 
				10, 
				null, 
				null,
			),
			$attributes['root'],
			PortableVisibilityConverter::fromArray([
				'file' => [
					'public' => 0777,
					'private' => 0755,
				],
				'dir' => [
					'public' => 0777,
					'private' => 0755,
				],
			])
		);
	}

	/**
	 * Get an S3 file system adapter
	 *
	 * @return bool
	 */
	public static function getS3Adapter($attributes) {
		$config = [
			'version' => 'latest',
			'region' => $attributes['region'],
			'credentials' => [
				'key' => $attributes['key'],
				'secret' => $attributes['secret']
			]
		];

		// create client
		//
		$client = S3Client::factory($config);

		return new S3Adapter($client, $attributes['bucket']);
	}

	/**
	 * Get a Dropbox file system adapter
	 *
	 * @return bool
	 */
	public static function getDropboxAdapter($attributes) {

		// create Dropbox Client
		//
		$client = new DropboxClient($attributes['access_token']);

		// create Dropbox Driver
		//
		return new DropboxAdapter($client);
	}

	/**
	 * Get a Storage file system adapter
	 *
	 * @return bool
	 */
	public static function getFileSystemAdapter($type, $attributes) {
				
		// create new client
		//
		switch ($type) {
			case 'ftp':
				$adapter = self::getFtpAdapter($attributes);
				break;
			case 'sftp':
				$adapter = self::getSftpAdapter($attributes);
				break;
			case 's3':
				$adapter = self::getS3Adapter($attributes);
				break;
			case 'dpbx':
				$adapter = self::getDropboxAdapter($attributes);
				break;
			default:
				$adapter = null;
		}
		if ($adapter) {
			$filesystem = new Filesystem($adapter, ['case_sensitive' => true]);
			$storage = new FilesystemAdapter($filesystem, $adapter);
		} else {
			$storage = null;
		}

		return $storage;
	}
}