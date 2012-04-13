class Huffman
  attr_accessor :codes, :message, :extra_bits

  def initialize(codes={}, message='', extra_bits=0)
    @codes = codes.invert
    @message = message
    @extra_bits = extra_bits
  end

  def uncompress
    text = ''
    code = ''
    #measure_mode = RubyProf::MEMORY
    #RubyProf.start
    @message.each_byte { |b|
      for i in 7.downto(0)
        code << b[i].to_s
        if !@codes[code].nil?
          text << @codes[code]
          code = ''
        end
      end
    }
    b = @message[-1].ord
    s = code.size
    code = ''
    reg = ''
    for i in (@extra_bits-1).downto(s)
      code << b[i].to_s
      if !@codes[code].nil?
        reg << @codes[code]
        code = ''
      end
    end
    text.slice!(/#{reg}$/)
#    binary = @message.unpack('B*')[0]
#    binary.slice!(-@extra_bits..-1) if @extra_bits > 0
#    binary.each_char { |char|
#      code << char
#      if !@codes[code].nil?
#        text << @codes[code]
#        code = ''
#      end
#    }
    #result = RubyProf.stop
    #printer = RubyProf::GraphHtmlPrinter.new(result)
    #now = Time.now
    #io = File.open("./profiles/huffman_test_profile #{now.strftime("%Y-%m-%d %H:%M:%:S.%L")}.html", 'w')
    #printer.print(io)
    text
  end
end

class String
  def compress
    weights = count_chars
    codes = calc_codes weights
    message, extra_bits = encode_string codes
    Huffman.new(codes, message, extra_bits)
  end

  private

  def count_chars
    weights = Hash.new(0)
    each_char { |char|
      weights[char]
      weights[char] += 1
    }
    weights
  end

  def calc_codes weights
    tree = weights.sort_by {|key, value| value}
    while tree.length>1
      left = tree.shift
      right = tree.shift
      node = [ [left, right], left[1]+right[1], {}]
      if 'Hash' == left[2].class.to_s
        left[2].each {|key, value| node[2][key] = '0' + value }
      elsif 'String' == left[0].class.to_s
        node[2][left[0]] = '0'
      end
      if 'Hash' == right[2].class.to_s
        right[2].each {|key, value| node[2][key] = '1' + value }
      elsif 'String' == right[0].class.to_s
        node[2][right[0]] = '1'
      end
      i = tree.rindex{|x| x[1]<=node[1]}
      i ||= -1
      tree.insert( i+1, node)
    end
    tree[0][2]
  end

  def encode_string codes
    message = ['']
    self.each_char { |c| message[0] << codes[c]}
    #message = [self.gsub(/.|\s/, codes)]            # This line is equlvalent to previous. But little slower.
    # other method is try perbit cycle
    # to reduce memory usage
    mod = message[0].length % 8
    extra_bits = mod > 0 ? 8 - mod : 0
    return message.pack('B*'), extra_bits
  end

end