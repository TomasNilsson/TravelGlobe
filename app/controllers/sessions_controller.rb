class SessionsController < ApplicationController
  def create
    user = User.from_omniauth(request.env['omniauth.auth'])
    cookies[:jwt] = { value: JsonWebToken.encode(sub: user.id), httponly: true }
    session[:user_id] = user.id # Only needed for old version
    redirect_to root_url
  end

  def destroy
    if current_user
      reset_session # Only needed for old version
    end
    cookies.delete :jwt
    redirect_to root_url
  end

  def failure
    redirect_to root_url, alert: 'Facebook login failed'
  end
end
