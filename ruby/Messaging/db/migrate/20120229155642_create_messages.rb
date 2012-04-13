class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :title
      t.text :body
      t.string :author_email
      t.boolean :importance

      t.timestamps
    end
  end
end
