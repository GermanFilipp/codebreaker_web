require "./game_init.rb"

use Rack::Static, :urls => ["/public"]

run InitGame.new 
