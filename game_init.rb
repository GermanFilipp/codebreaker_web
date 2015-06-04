require "erb"
require 'bundler/setup'
require "code_breaker" 
class InitGame
  def call(env)
    @request = Rack::Request.new(env)
    start false
    case @request.path
      when "/"
        start true
        start_game
        render_index
      when "/hint"
        hint
      when "/check"
        check
      when "/get_code"
        get_code
      when "/get_move"
        get_move
      when "/add_data"
        @save_score = CodeBreaker::Gamer.new
        load_data
        add_data
        save_score
      else
        #render_index
       Rack::Response.new("Not Found",404)
    end
  end
 

  def start_game
    Rack::Response.new(@game.start)
  end

  def check
    response = @game.check_number @request.params['val']
    Rack::Response.new(response)
  end

  def render_index
    Rack::Response.new(render("index.html.erb"))
  end

  def get_code
    Rack::Response.new(@game.secret_code)
  end

  def get_move
    Rack::Response.new("#{@game.move}")
  end

  def hint 
    Rack::Response.new(@game.get_hint)
  end
  def add_data
    response  = @save_score.add(CodeBreaker::User.new(name: @request.params['val'], turns: @game.move))
    Rack::Response.new(response)
  end
  def load_data
    Rack::Response.new(@save_score.load_data)
  end
  def save_score
    Rack::Response.new(@save_score.save_data)
  end

  def render(template)
    path = File.expand_path("public/views/#{template}")
    ERB.new(File.read(path)).result(binding)
  end
  
  def start boll
    return @game = CodeBreaker::Game.new  if boll
    @game ||= CodeBreaker::Game.new
  end 
end
