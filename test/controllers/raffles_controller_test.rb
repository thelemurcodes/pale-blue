require "test_helper"

class RafflesControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get raffles_new_url
    assert_response :success
  end

  test "should get create" do
    get raffles_create_url
    assert_response :success
  end

  test "should get edit" do
    get raffles_edit_url
    assert_response :success
  end

  test "should get show" do
    get raffles_show_url
    assert_response :success
  end

  test "should get update" do
    get raffles_update_url
    assert_response :success
  end
end
