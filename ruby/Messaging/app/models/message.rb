class Message < ActiveRecord::Base

  belongs_to :user, :foreign_key => 'author_email', :primary_key => 'email'
end
