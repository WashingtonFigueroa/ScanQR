<?php

namespace App\Http\Middleware;

use App\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TokenReview
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $tokenLog = $request->header('tokenLog');
        $id = Auth::id();
        $user = User::find($id);
        if ($tokenLog === $user['token'] || $user['token'] === null) {
            return $next($request);
        } else {
            return redirect('/api/revocar');
        }
    }
}
