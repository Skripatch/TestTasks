require 'rubygems'
gem 'test-unit'
require "test/unit"
require_relative "huffman"
require 'benchmark'
require 'ruby-prof/test'

class HuffmanTest < Test::Unit::TestCase
  def setup
  end

  def teardown
  end

  def test_1
    # short text, wide alphabet
    str = 'AHFBHCEHEHCEAHDCEEHHHCHHHDEGHGGEHCHH'
    pack, unpack = nil
    puts"First string stat:"
    Benchmark.bm(12) do |x|
      x.report("pack:") { pack = str.compress }
      x.report("unpack") { unpack = pack.uncompress }
    end
    assert_equal(str, 'AHFBHCEHEHCEAHDCEEHHHCHHHDEGHGGEHCHH')
    original_size = str.bytesize
    pack_size = pack.message.bytesize
    code_size = pack.codes.to_a.join.bytesize
    puts "\t\t\tOriginal size: #{original_size}"
    puts "\t\t\tMessage size: #{pack_size}, including codes: #{pack_size+code_size}"
    puts "\t\t\tCompression: #{pack_size*100/original_size}%, including codes:#{(pack_size+code_size)*100/original_size}%",
    assert_equal(unpack, str)
  end

  def test_2
    # long text, short alphabet
    str = 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCEEEEEEEEEEEEEEEEEEEEEEEEEBBBBBBBBBBBBBBBBBBBBFFFFFFFFFFAAAAAAAAAADDDDD'
    pack, unpack = nil
    puts"Second string stat:"
    Benchmark.bm(12) do |x|
      x.report("pack:") { pack = str.compress }
      x.report("unpack:") { unpack = pack.uncompress}
    end
    original_size = str.bytesize
    pack_size = pack.message.bytesize
    code_size = pack.codes.to_a.join.bytesize
    puts "\t\t\tOriginal size: #{original_size}"
    puts "\t\t\tMessage size: #{pack_size}, including codes: #{pack_size+code_size}"
    puts "\t\t\tCompression: #{pack_size*100/original_size}%, including codes:#{(pack_size+code_size)*100/original_size}%",
    assert_equal(unpack, str)
  end

  def test_3
    # long text, wide alphabet
    io = File.open(File.dirname(__FILE__) + '/lorem.txt', 'r')
    str = io.read
    io.close
    pack, unpack = nil
    puts"Third string stat:"
    Benchmark.bm(12) do |x|
      x.report("pack:") { pack = str.compress }
      x.report("unpack:") { unpack = pack.uncompress}
    end
    original_size = str.bytesize
    pack_size = pack.message.bytesize
    code_size = pack.codes.to_a.join.bytesize
    puts "\t\t\tOriginal size: #{original_size}"
    puts "\t\t\tMessage size: #{pack_size}, including codes: #{pack_size+code_size}"
    puts "\t\t\tCompression: #{pack_size*100/original_size}%, including codes:#{(pack_size+code_size)*100/original_size}%", ''
    assert_equal(unpack, str)
  end

  def test_4
    fib = Enumerator.new do |yielder|
      a, b = 1, 1
      loop do
        yielder.yield a
        a, b = b, a + b
      end
    end
    str, pack, unpack = nil
    puts "Fourth string stat:"
    Benchmark.bm(12) do |x|
      alphabet = (('A'..'Z').to_a + ('a'..'z').to_a).shuffle
      x.report("generating:") { str = alphabet[0..38].map { |c| [c] * fib.next }.flatten.shuffle.join }
      x.report("pack:") { pack = str.compress }
      #x.report("unpack") { unpack = pack.uncompress }
    end
    original_size = str.bytesize
    pack_size = pack.message.bytesize
    code_size = pack.codes.to_a.join.bytesize
    puts"\t\t\tOriginal size: #{original_size}"
    puts"\t\t\tMessage size: #{pack_size}, including codes: #{pack_size+code_size}"
    puts"\t\t\tCompression: #{pack_size*100/original_size}%, including codes:#{(pack_size+code_size)*100/original_size}%"
    #assert_equal(unpack, str)
  end

end