get '/' do
  @notes = Note.all
  erb :index
end

post '/create' do
  note = Note.create(params[:note])
  erb :_note, { layout: false, locals: { note: note } }
end

get '/update/:id' do
  note = Note.find(params[:id])
  erb :_update, { layout: false, locals: { note: note } }
end

post '/update/:id' do
  note = Note.find(params[:id])
  note.update_attributes(params[:note])
  note.save
  note.to_json
end

get '/destroy/:id' do
  Note.destroy(params[:id])
end
