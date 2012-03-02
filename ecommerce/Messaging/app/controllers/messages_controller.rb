class MessagesController < ApplicationController
  before_filter :authenticate

  def index
    @messages = @current_user.messages
  end

  def new
    @message = Message.new
  end

  def create
    @current_user.messages.create(params[:message])
    redirect_to messages_path
  end

  def toggle
    @message = Message.find(params[:id])
    # check if user have permissions to this message
    if @current_user.messages.include?(@message)
      @message.toggle!(:importance)
      render :json => { :status => 'OK', :id => @message.id, :state => @message.importance? }
    else
      render :json => { :status => 'Forbidden' }
    end
  end

  def update
    @message = Message.find(params[:id])
    if @current_user.messages.include?(@message)
      @message.update_attributes(:title => params[:message][:title],
                                 :body => params[:message][:body],
                                 :importance => params[:message][:importance])
    end
    redirect_to messages_path
  end

  def edit
    @message = Message.find(params[:id])
    if !@current_user.messages.include?(@message)
      redirect_to messages_path
    end
  end

  def destroy
    @message = Message.find(params[:id])
    if @current_user.messages.include?(@message)
      @message.destroy
      render :json => { :status => 'OK', :id => @message.id }
    else
      render :json => { :status => 'Forbidden' }
    end
  end
end
