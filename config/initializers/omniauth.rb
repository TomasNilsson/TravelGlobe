OmniAuth.config.logger = Rails.logger

OmniAuth.config.on_failure = Proc.new { |env|
  OmniAuth::FailureEndpoint.new(env).redirect_to_failure
}

Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, ENV['FACEBOOK_APP_ID'], ENV['FACEBOOK_SECRET'], secure_image_url: true,  
    client_options: {
      site: 'https://graph.facebook.com/v7.0',
      authorize_url: "https://www.facebook.com/v7.0/dialog/oauth"
    }
end