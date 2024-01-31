<?php 
/******************************************************************************\
|                                                                              |
|                              VerifyAccount.php                               |
|                                                                              |
|******************************************************************************|
|                                                                              |
|        This defines middleware to verify a user account.                     |
|                                                                              |
|        Author(s): Abe Megahed                                                |
|                                                                              |
|        This file is subject to the terms and conditions defined in           |
|        'LICENSE.txt', which is part of this source code distribution.        |
|                                                                              |
|******************************************************************************|
|            Copyright (C) 2016-2020, Sharedigm, www.sharedigm.com             |
\******************************************************************************/

namespace App\Http\Middleware\Authentication;

use Closure;
use App\Models\Users\UserAccount;
use App\Utilities\Filters\FiltersHelper;

class VerifyAccount
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		/*
		// check request by method
		//
		switch (FiltersHelper::method()) {
			case 'post':
				break;
			case 'get':
			case 'put':
			case 'delete':
				$linkedAccountId = $request->route('user_permission_id');
				if ($linkedAccountId) {
					$linkedAccount = LinkedAccount::where('linked_account_uid', '=', $linkedAccountId);
					if (!$linkedAccount) {
						return response('Linked account not found.', 404);
					}	
				}
				break;
		}
		*/

		return $next($request);
	}
}