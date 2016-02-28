class SessionsController < ApplicationController
  
  def create
    user = User.from_omniauth(env["omniauth.auth"])
    puts env["omniauth.auth"]
    session[:user_id] = user.id
    redirect_to root_url
  end

  def destroy
    if current_user
      session.delete(:user_id)
    end
    redirect_to root_url
  end

end