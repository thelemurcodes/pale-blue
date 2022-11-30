require "test_helper"

class FilControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get fil_new_url
    assert_response :success
  end

  test "should get create" do
    get fil_create_url
    assert_response :success
  end

  test "should get destroy" do
    get fil_destroy_url
    assert_response :success
  end

  test "should get edit" do
    get fil_edit_url
    assert_response :success
  end

  test "should get index" do
    get fil_index_url
    assert_response :success
  end
end
