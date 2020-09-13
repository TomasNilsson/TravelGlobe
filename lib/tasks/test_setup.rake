namespace :db do
  namespace :test do
    task :seed_user => :environment do
      User.where({name: 'Charlie', uid: 'uid', id: 99}).first_or_create
    end
  end
end