require "test_helper"

class RaffleItemsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get raffle_items_new_url
    assert_response :success
  end

  test "should get create" do
    get raffle_items_create_url
    assert_response :success
  end
end
