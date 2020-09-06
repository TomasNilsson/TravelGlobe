class ApplicationController < ActionController::Base  
  protect_from_forgery unless: -> { request.format.json? }

  rescue_from CanCan::AccessDenied do |exception|
    render json: {}, status: :unauthorized
  end

  private
  def authorize_request
    token = cookies[:jwt]
    begin
      decoded_token = JsonWebToken.decode(token)
      @current_user = User.find(decoded_token[:sub])
    rescue JWT::DecodeError, ActiveRecord::RecordNotFound
      render json: {}, status: :unauthorized
    end
  end
  
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id] # Only needed for old version
    if @current_user.blank?
      token = cookies[:jwt]
      begin
        decoded_token = JsonWebToken.decode(token)
        @current_user = User.find(decoded_token[:sub])
      rescue JWT::DecodeError, ActiveRecord::RecordNotFound
      end
    end
    return @current_user
  end

  helper_method :current_user
end
