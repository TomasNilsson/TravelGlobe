source 'https://rubygems.org'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '6.0.2.2'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 6.0'
# Use Webpacker as JavaScript compiler. Read more: https://github.com/rails/webpacker
gem 'webpacker'
# Use React with Rails
gem 'react-rails'

# Use jquery as the JavaScript library
gem 'jquery-rails'
gem 'jquery-ui-rails'

# Use Active Model Serializers to control JSON generation
gem 'active_model_serializers', '~> 0.10.0'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use Bootstrap
gem 'bootstrap-sass', '~> 3.4.1'
gem 'bootstrap-datepicker-rails'

# Use jwt for authorization
gem 'jwt'
# Use Facebook authentication
gem 'omniauth-facebook'
# Koala is a Facebook library for Ruby, supporting e.g. the Graph API 
gem "koala", "~> 2.2"

# Use CanCanCan for authorization control
gem 'cancancan', '~> 1.10'

# Use Figaro to set environment variables
gem 'figaro'

# Use Cocoon for dynamic nested forms
gem "cocoon"

# Use Cloudinary to upload images to the cloud
gem 'cloudinary'

# Use HasSecureToken to generate unique random tokens 
gem 'has_secure_token'

# Use ValidatesTimeliness to validate dates, times and datetimes
gem 'validates_timeliness', '~> 4.0'

# Use Data-Confirm Modal to use confirmation modals
gem 'data-confirm-modal'

# Use Axlsx to export to Excel
gem 'rubyzip', '>= 1.2.1'
gem 'axlsx', git: 'https://github.com/randym/axlsx.git', ref: 'c8ac844'
gem 'axlsx_rails'

# Use jQuery HotKeys for WYSIWYG editor
gem 'jquery-hotkeys-rails'

group :development do
  # Use sqlite3 as the database for Active Record
  gem 'sqlite3', '~> 1.4.2'

  # Use Capistrano for deployment
  gem 'capistrano', '~> 3.1'
  gem 'capistrano-bundler', '~> 1.1.2'
  gem 'capistrano-rails', '~> 1.1'
  gem 'capistrano-rvm'
  gem 'capistrano-passenger'
  
  # Use 'ruby-debug-ide' and 'debase' to enable debugging in VS Code
  gem 'ruby-debug-ide'
  gem 'debase'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  # The Listen gem is needed for ActiveSupport::EventedFileUpdateChecker
  gem 'listen', '~> 3.0'
end

group :production do
  # Use mysql2 as the database for production
  gem 'mysql2', '~> 0.4.0'
end