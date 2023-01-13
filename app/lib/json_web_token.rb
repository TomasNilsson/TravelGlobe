class JsonWebToken
  SECRET_KEY = Rails.application.secret_key_base.to_s
  ALGORITHM = 'HS256'
  ISSUER = 'https://travelglobe.tomnil.se'

  def self.encode(payload, exp = 24.hours.from_now)
    payload[:exp] = exp.to_i
    JWT.encode({ iss: ISSUER }.merge(payload), SECRET_KEY, ALGORITHM)
  end

  def self.decode(token)
    decoded =
      JWT.decode(
        token,
        SECRET_KEY,
        true,
        { iss: ISSUER, verify_iss: true, algorithm: ALGORITHM },
      )
    HashWithIndifferentAccess.new decoded[0]
  end

  def self.verify_google_jwt(token)
    validator = GoogleIDToken::Validator.new
    payload = validator.check(token, ENV['GOOGLE_CLIENT_ID'])
    HashWithIndifferentAccess.new payload
  end
end
