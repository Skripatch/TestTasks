class HomeController < ApplicationController
  def index

  end

  def login
    return unless request.post?

    # Immediately return if user's already logged in
    if signed_in?
      redirect_to root_path
      return
    end

    # Try to find this user in database
    user = User.find_by_email(params[:email])
    if user # We know them
      if User.authenticate(user,params[:password])
        sign_in user
        redirect_back_or_to messages_path
      else
        redirect_to root_path
      end
    else # Seems like new user. Try to register.
      user = User.create(:email => params[:email], :password => params[:password])
      if user
        sign_in user
        redirect_back_or_to messages_path
      else
        redirect_to root_path
      end
    end
  end

  def logout
    sign_out
    redirect_to root_path
  end

end