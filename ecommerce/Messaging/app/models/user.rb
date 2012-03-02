require 'digest/sha1'
class User < ActiveRecord::Base

  email_regex = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

  attr_accessor :password
  attr_accessible :email, :password

  validates :email, :presence => true,
                       :format   => { :with => email_regex },
                       :uniqueness => true
  validates :password, :presence     => true,
                       :length       => { :within => 6..40 }
  before_save :encrypt_password

  has_many :messages, :foreign_key => 'author_email', :primary_key => 'email', :order => 'created_at' #seems that 'DESC' is depricated.

  # Return true if the user's password matches the submitted password.
  def has_password?(submitted_password)
    # Compare encrypted_password with the encrypted version of
    # submitted_password.
    encrypted_password == encrypt(submitted_password)
  end

  def self.authenticate(user, submitted_password)
    user.has_password?(submitted_password)
  end

  def self.authenticate_with_salt(id, cookie_salt)
    user = find_by_id(id)
    (user && user.salt == cookie_salt) ? user : nil
  end

  private

    def encrypt_password
      self.salt = make_salt if new_record?
      self.encrypted_password = encrypt(password)
    end

    def encrypt(string)
      secure_hash("#{salt}--#{string}")
    end

    def make_salt
      secure_hash("#{Time.now.utc}--#{password}")
    end

    def secure_hash(string)
      Digest::SHA2.hexdigest(string)
    end

end