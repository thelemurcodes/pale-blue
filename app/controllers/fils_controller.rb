class FilsController < ApplicationController
  def new
    @fil = Fil.new
  end

  def create
    @fil = Fil.new(fil_params)
    @fil.creator = @creator

    if @fil.save
      redirect_to creator_path(@creator)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def destroy
  end

  def edit
  end

  def index
  end

  private

  def fil_params
    tokens = params[:fil][:creator_id].split(',')
    tokens.select do |token|
      Creator.find_by("pale_blue_tkn = ?", token)
    end

    @creator = Creator.find_by("pale_blue_tkn = ?", tokens.first)
    params.require(:fil).permit(:name, :photo)
  end
end
