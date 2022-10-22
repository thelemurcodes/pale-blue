class DonationsController < ApplicationController
  def new
    @donation = Donation.new
    @creator = Creator.find(params[:creator_id])
  end

  def create
    @donation = Donation.new(donation_params)
    @creator = Creator.find(params[:creator_id])
    @donation.creator = @creator
    if @donation.save
      redirect_to @donation, notice: "Donation was successful! Obrigado!" and return
    else
      render :new, status: :unprocessable_entity
    end
  end

  def show
    @donation = Donation.find(params[:id])
  end

  def update
    @donation = Donation.find(params[:id])
    @donation.update(redeem_params) # Will raise ActiveModel::ForbiddenAttributesError
    redirect_to donation_path(@donation)
  end

  private

  def donation_params
    params.require(:donation).permit(:amount, :confirmation)
  end

  def redeem_params
    params.require(:donation).permit(:redeemed)
  end
end
