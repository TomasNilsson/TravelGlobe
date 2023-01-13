class SessionsController < ApplicationController
  def create
    begin
      decoded_token = JsonWebToken.verify_google_jwt(params[:jwt])
      user = User.from_google_user(decoded_token)
      user[:token] = JsonWebToken.encode(sub: user.id)
      render json: user, status: :ok
    rescue GoogleIDToken::ValidationError, ActiveRecord::RecordNotFound
      render json: {}, status: :unauthorized
    end
  end

  def destroy
    if current_user
      reset_session # Only needed for old version
    end
    cookies.delete :jwt
    redirect_to root_url
  end

  def refresh
    begin
      decoded_token = JsonWebToken.decode(params[:jwt])
      user = User.find(decoded_token[:sub])
      user[:token] = JsonWebToken.encode(sub: user.id)
      render json: user, status: :ok
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
      render json: {}, status: :unauthorized
    end
  end
end
