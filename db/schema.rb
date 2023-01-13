# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_01_13_192304) do
  create_table 'categories', force: :cascade do |t|
    t.string 'name'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.integer 'user_id'
    t.index ['user_id'], name: 'index_categories_on_user_id'
  end

  create_table 'categories_trips', id: false, force: :cascade do |t|
    t.integer 'category_id'
    t.integer 'trip_id'
    t.index ['category_id'], name: 'index_categories_trips_on_category_id'
    t.index ['trip_id'], name: 'index_categories_trips_on_trip_id'
  end

  create_table 'countries', force: :cascade do |t|
    t.string 'name'
    t.string 'code'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'countries_trips', id: false, force: :cascade do |t|
    t.integer 'country_id'
    t.integer 'trip_id'
    t.index ['country_id'], name: 'index_countries_trips_on_country_id'
    t.index ['trip_id'], name: 'index_countries_trips_on_trip_id'
  end

  create_table 'countries_users', id: false, force: :cascade do |t|
    t.integer 'country_id'
    t.integer 'user_id'
    t.index %w[country_id user_id],
            name: 'index_countries_users_on_country_id_and_user_id',
            unique: true
    t.index ['country_id'], name: 'index_countries_users_on_country_id'
    t.index ['user_id'], name: 'index_countries_users_on_user_id'
  end

  create_table 'photos', force: :cascade do |t|
    t.string 'thumb_url'
    t.string 'image_url'
    t.string 'caption'
    t.integer 'trip_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.integer 'order'
    t.string 'external_id'
    t.string 'from'
    t.index ['trip_id'], name: 'index_photos_on_trip_id'
  end

  create_table 'places', force: :cascade do |t|
    t.string 'name'
    t.decimal 'latitude', precision: 11, scale: 8
    t.decimal 'longitude', precision: 11, scale: 8
    t.integer 'order'
    t.integer 'trip_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['trip_id'], name: 'index_places_on_trip_id'
  end

  create_table 'places_lived', force: :cascade do |t|
    t.string 'address'
    t.integer 'country_id'
    t.decimal 'latitude', precision: 11, scale: 8
    t.decimal 'longitude', precision: 11, scale: 8
    t.date 'start_date'
    t.date 'end_date'
    t.integer 'user_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['country_id'], name: 'index_places_lived_on_country_id'
    t.index ['user_id'], name: 'index_places_lived_on_user_id'
  end

  create_table 'share_requests', force: :cascade do |t|
    t.integer 'trip_id'
    t.integer 'from_user_id'
    t.integer 'to_user_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'status'
    t.index ['from_user_id'], name: 'index_share_requests_on_from_user_id'
    t.index ['to_user_id'], name: 'index_share_requests_on_to_user_id'
    t.index ['trip_id'], name: 'index_share_requests_on_trip_id'
  end

  create_table 'travel_partners', force: :cascade do |t|
    t.string 'name'
    t.integer 'user_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.integer 'shared_user_id'
    t.index ['shared_user_id'], name: 'index_travel_partners_on_shared_user_id'
    t.index ['user_id'], name: 'index_travel_partners_on_user_id'
  end

  create_table 'travel_partners_trips', id: false, force: :cascade do |t|
    t.integer 'travel_partner_id'
    t.integer 'trip_id'
    t.index ['travel_partner_id'],
            name: 'index_travel_partners_trips_on_travel_partner_id'
    t.index ['trip_id'], name: 'index_travel_partners_trips_on_trip_id'
  end

  create_table 'trips', force: :cascade do |t|
    t.string 'name'
    t.date 'start_date'
    t.date 'end_date'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.text 'notes'
  end

  create_table 'trips_users', id: false, force: :cascade do |t|
    t.integer 'trip_id'
    t.integer 'user_id'
    t.index ['trip_id'], name: 'index_trips_users_on_trip_id'
    t.index ['user_id'], name: 'index_trips_users_on_user_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string 'uid', null: false
    t.string 'name'
    t.text 'image_url'
    t.string 'oauth_token'
    t.datetime 'oauth_expires_at'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.string 'token'
    t.datetime 'current_sign_in_at'
    t.datetime 'last_sign_in_at'
    t.string 'email'
    t.index ['token'], name: 'index_users_on_token'
    t.index ['uid'], name: 'index_users_on_uid'
    t.index ['email'], name: 'index_users_on_email'
  end

  add_foreign_key 'categories', 'users'
  add_foreign_key 'photos', 'trips'
  add_foreign_key 'places', 'trips'
  add_foreign_key 'places_lived', 'countries'
  add_foreign_key 'places_lived', 'users'
  add_foreign_key 'share_requests', 'trips'
  add_foreign_key 'share_requests', 'users', column: 'from_user_id'
  add_foreign_key 'share_requests', 'users', column: 'to_user_id'
  add_foreign_key 'travel_partners', 'users'
  add_foreign_key 'travel_partners', 'users', column: 'shared_user_id'
end
