class Note < ActiveRecord::Base
  validates :title, :content, presence: true
  before_save :update_timestamp

  protected

  def update_timestamp
    self.updated_at = Time.now
  end
end
