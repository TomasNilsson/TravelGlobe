# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170121185503) do

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
  end

  add_index "categories", ["user_id"], name: "index_categories_on_user_id"

  create_table "categories_trips", id: false, force: :cascade do |t|
    t.integer "category_id"
    t.integer "trip_id"
  end

  add_index "categories_trips", ["category_id"], name: "index_categories_trips_on_category_id"
  add_index "categories_trips", ["trip_id"], name: "index_categories_trips_on_trip_id"

  create_table "countries", force: :cascade do |t|
    t.string   "name"
    t.string   "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "countries_trips", id: false, force: :cascade do |t|
    t.integer "country_id"
    t.integer "trip_id"
  end

  add_index "countries_trips", ["country_id"], name: "index_countries_trips_on_country_id"
  add_index "countries_trips", ["trip_id"], name: "index_countries_trips_on_trip_id"

  create_table "countries_users", id: false, force: :cascade do |t|
    t.integer "country_id"
    t.integer "user_id"
  end

  add_index "countries_users", ["country_id", "user_id"], name: "index_countries_users_on_country_id_and_user_id", unique: true
  add_index "countries_users", ["country_id"], name: "index_countries_users_on_country_id"
  add_index "countries_users", ["user_id"], name: "index_countries_users_on_user_id"

  create_table "photos", force: :cascade do |t|
    t.string   "thumb_url"
    t.string   "image_url"
    t.string   "caption"
    t.integer  "trip_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "order"
    t.integer  "user_id"
    t.string   "external_id"
    t.string   "from"
  end

  add_index "photos", ["trip_id"], name: "index_photos_on_trip_id"
  add_index "photos", ["user_id"], name: "index_photos_on_user_id"

  create_table "places", force: :cascade do |t|
    t.string   "name"
    t.decimal  "latitude",   precision: 11, scale: 8
    t.decimal  "longitude",  precision: 11, scale: 8
    t.integer  "order"
    t.integer  "trip_id"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "places", ["trip_id"], name: "index_places_on_trip_id"

  create_table "places_lived", force: :cascade do |t|
    t.string   "address"
    t.integer  "country_id"
    t.decimal  "latitude",   precision: 11, scale: 8
    t.decimal  "longitude",  precision: 11, scale: 8
    t.date     "start_date"
    t.date     "end_date"
    t.integer  "user_id"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "places_lived", ["country_id"], name: "index_places_lived_on_country_id"
  add_index "places_lived", ["user_id"], name: "index_places_lived_on_user_id"

  create_table "share_requests", force: :cascade do |t|
    t.integer  "trip_id"
    t.integer  "from_user_id"
    t.integer  "to_user_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.string   "status"
  end

  add_index "share_requests", ["from_user_id"], name: "index_share_requests_on_from_user_id"
  add_index "share_requests", ["to_user_id"], name: "index_share_requests_on_to_user_id"
  add_index "share_requests", ["trip_id"], name: "index_share_requests_on_trip_id"

  create_table "travel_partners", force: :cascade do |t|
    t.string   "name"
    t.integer  "user_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.integer  "shared_user_id"
  end

  add_index "travel_partners", ["shared_user_id"], name: "index_travel_partners_on_shared_user_id"
  add_index "travel_partners", ["user_id"], name: "index_travel_partners_on_user_id"

  create_table "travel_partners_trips", id: false, force: :cascade do |t|
    t.integer "travel_partner_id"
    t.integer "trip_id"
  end

  add_index "travel_partners_trips", ["travel_partner_id"], name: "index_travel_partners_trips_on_travel_partner_id"
  add_index "travel_partners_trips", ["trip_id"], name: "index_travel_partners_trips_on_trip_id"

  create_table "trips", force: :cascade do |t|
    t.string   "name"
    t.date     "start_date"
    t.date     "end_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "trips_users", id: false, force: :cascade do |t|
    t.integer "trip_id"
    t.integer "user_id"
  end

  add_index "trips_users", ["trip_id"], name: "index_trips_users_on_trip_id"
  add_index "trips_users", ["user_id"], name: "index_trips_users_on_user_id"

  create_table "users", force: :cascade do |t|
    t.string   "uid",                null: false
    t.string   "name"
    t.string   "image_url"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "token"
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
  end

  add_index "users", ["token"], name: "index_users_on_token"
  add_index "users", ["uid"], name: "index_users_on_uid"

end
