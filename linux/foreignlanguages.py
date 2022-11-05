# foreign language module [edwiz]
# created by Chris Taylor [C0SM0] and Jordan

import os
import platform as pf
import webbrowser

class Google_Translate():
    def __init__(self, words):
        self.words = words

    def detect_language(self):
        foreign_text = self.words.replace(' ', '%20')

        # TODO implement chrome

        # os detection 
        web_address = f'https://translate.google.com/?sl=auto^&tl=en^&text={foreign_text}^&op=translate'

        # detects windows
        if os.name == 'nt':
            return os.system(f'start {web_address}')

        # detects linux
        elif os.name == 'posix' and 'Linux' in pf.system():
            return os.system(f'firefox {web_address}')

        # detects amc and other os
        else:
            return os.system(f'open {web_address}')

        return os.system()

class Wordreference():
    def __init__(self, word):
        self.word = word

    def search(self):
        word_searched = self.word

        webbrowser.open(f'https://www.wordreference.com/es/en/translation.asp?spen={word_searched}')

# main code
def foreign_language_main():
    gt = Google_Translate()
    print(gt.detect_language())

# runs main code if file is imported or ran
if __name__ == '__main__':
    foreign_language_main()