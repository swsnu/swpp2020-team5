from konlpy.tag import Hannanum, Okt

def weight_tokens(tokens):

  unfiltered_dict = {}
  for token in tokens:
    if token in unfiltered_dict:
      unfiltered_dict[token] += 1
    else:
      unfiltered_dict[token] = 1
  tokens_dict = { key:value for (key,value) in unfiltered_dict.items() if value > 1 }
  return tokens_dict

def tokenize_and_filter(text, hannanum, okt):

  han_tokens = hannanum.pos(text, ntags=22)
  print("Hannanum: done...")
  okt_tokens = okt.pos(text, norm=True, stem=True)
  print("Okt: done.")

  filtered_tokens = []
  for token in han_tokens:
    if token[1] in ["NC"]: # hannanum서는 명사만
      filtered_tokens.append(token[0])
  for token in okt_tokens:
    if token[1] in ["Adjective"]: # okt에서는 형용사만
      filtered_tokens.append(token[0])
  print("Tokenization complete.")
  return filtered_tokens
