namespace :db do
  namespace :test do
    task :prepare_user => :environment do
      User.create({name: 'Charlie', uid: 'uid', id: 99})
    end
  end
end