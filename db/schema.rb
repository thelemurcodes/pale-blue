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

ActiveRecord::Schema[7.0].define(version: 2022_11_21_163855) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "account_names", force: :cascade do |t|
    t.string "name"
    t.text "purpose"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "blockchains", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "creators", force: :cascade do |t|
    t.bigint "blockchain_id", null: false
    t.string "pale_blue_tkn"
    t.string "name"
    t.text "answer_one"
    t.text "answer_two"
    t.text "answer_three"
    t.boolean "non_profit"
    t.text "about"
    t.text "facebook"
    t.text "twitter"
    t.text "instagram"
    t.text "linkedin"
    t.text "discord"
    t.text "website"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["blockchain_id"], name: "index_creators_on_blockchain_id"
  end

  create_table "donations", force: :cascade do |t|
    t.bigint "creator_id", null: false
    t.bigint "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "confirmation"
    t.boolean "redeemed"
    t.index ["creator_id"], name: "index_donations_on_creator_id"
  end

  create_table "fils", force: :cascade do |t|
    t.bigint "creator_id", null: false
    t.text "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_fils_on_creator_id"
  end

  create_table "locations", force: :cascade do |t|
    t.bigint "creator_id", null: false
    t.decimal "latitude"
    t.decimal "longitude"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_locations_on_creator_id"
  end

  create_table "pale_blue_accounts", force: :cascade do |t|
    t.bigint "blockchain_id", null: false
    t.bigint "account_name_id", null: false
    t.string "public_address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_name_id"], name: "index_pale_blue_accounts_on_account_name_id"
    t.index ["blockchain_id"], name: "index_pale_blue_accounts_on_blockchain_id"
  end

  create_table "raffle_items", force: :cascade do |t|
    t.bigint "raffle_id", null: false
    t.string "tkn_address"
    t.boolean "delivered"
    t.bigint "raffle_ticket_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.text "description"
    t.index ["raffle_id"], name: "index_raffle_items_on_raffle_id"
    t.index ["raffle_ticket_id"], name: "index_raffle_items_on_raffle_ticket_id"
  end

  create_table "raffle_tickets", force: :cascade do |t|
    t.bigint "blockchain_id", null: false
    t.string "wallet_address"
    t.bigint "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["blockchain_id"], name: "index_raffle_tickets_on_blockchain_id"
  end

  create_table "raffles", force: :cascade do |t|
    t.bigint "creator_id", null: false
    t.string "title"
    t.text "about"
    t.boolean "running", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "end_date"
    t.time "end_time"
    t.index ["creator_id"], name: "index_raffles_on_creator_id"
  end

  create_table "reactions", force: :cascade do |t|
    t.bigint "creator_id", null: false
    t.bigint "like"
    t.bigint "dislike"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_reactions_on_creator_id"
  end

  create_table "redeemers", force: :cascade do |t|
    t.bigint "raffle_item_id", null: false
    t.bigint "raffle_ticket_id", null: false
    t.integer "amount"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["raffle_item_id"], name: "index_redeemers_on_raffle_item_id"
    t.index ["raffle_ticket_id"], name: "index_redeemers_on_raffle_ticket_id"
  end

  create_table "tags", force: :cascade do |t|
    t.bigint "creator_id", null: false
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_tags_on_creator_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "creators", "blockchains"
  add_foreign_key "donations", "creators"
  add_foreign_key "fils", "creators"
  add_foreign_key "locations", "creators"
  add_foreign_key "pale_blue_accounts", "account_names"
  add_foreign_key "pale_blue_accounts", "blockchains"
  add_foreign_key "raffle_items", "raffle_tickets"
  add_foreign_key "raffle_items", "raffles"
  add_foreign_key "raffle_tickets", "blockchains"
  add_foreign_key "raffles", "creators"
  add_foreign_key "reactions", "creators"
  add_foreign_key "redeemers", "raffle_items"
  add_foreign_key "redeemers", "raffle_tickets"
  add_foreign_key "tags", "creators"
end
