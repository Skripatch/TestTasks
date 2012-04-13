class ProductsController < ApplicationController
  respond_to :html

  def index
    @products = Product.all
    respond_with @products
  end

  def show
    @product = Product.find(params[:id])
  end

  def new
    @product = Product.new
    respond_with @product
  end

  def edit
    @product = Product.find(params[:id])
  end

  def create
    @product = Product.new(params[:product])
    if @product.save
       redirect_to product_path(@product)
    else
      render :action => 'new'
    end
  end

  def update
  end

  def destroy
  end

end
