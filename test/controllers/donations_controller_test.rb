require "test_helper"

class DonationsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get donations_new_url
    assert_response :success
  end
end
