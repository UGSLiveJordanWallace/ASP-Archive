# english module [edwiz]
# created by Chris Taylor [C0SM0] and Jordan

import os

# resources for other classes
class Resources():
    def __init__(self, file):
        self.file = file

    # reads file
    def get_file(self):
        input_file = self.file

        with open(input_file) as f:
            read_file = f.read()

        return read_file

    def get_lines(self):
        input_file = self.file

        with open(input_file) as f:
            read_lines = f.readlines()

        return read_lines

# class for getting percentage of letters
class Letter_Percentage(Resources):
    # counts letters
    def letter_counter(self, file, letter):
        count = 0

        for c in file:
            if  c == letter:
                count += 1

        return count

    # gets the percentage of certain letters in a file
    def letter_main(self):
        read_file = self.get_file()
        percentage_list = []
        alphabet = 'aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ'
        output_string = ''

        for char in alphabet:
            letter_count = self.letter_counter(read_file, char)
            percent = 100 * letter_count/ len(read_file)
            percentage_list.append('{0} - {1}%'.format(char, round(percent, 2)))

        for i in percentage_list:
            if i.endswith('- 0.0%'):
                continue
            else:
                output_string += f'{i}\n'

        return output_string

# checks MLA formatting of file
class MLA_Checker(Resources):
    def checker_main(self):
        # personal pronouns
        ppn = ['I ', ' me ', ' We', ' we', ' us ', ' You ', ' you ']

        # contractions
        contraction = ["'t", "'d", "'ve", "'ll", "'m", "'re", "'s"]

        # error number
        exception = 0

        read_lines = self.get_lines()
        checked_mla = 'Report :\n'
        line_number = 0

        for line in read_lines:
            line_number += 1
            # check for personal pronouns
            for pronoun in ppn:
                if pronoun in line:
                    checked_mla += f'Personal Pronoun "{pronoun}" on Line {line_number}\n'
                    exception += 1

            # check for contraction
            for c in contraction:
                if c in line:
                    checked_mla += f'Contraction "{c}" on line {line_number}\n'
                    exception += 1

        checked_mla += f'Errors : {exception}'

        return checked_mla

# online dictionary
class Merriam_Webster():
    def __init__(self, search):
        self.search = search

    def word_search(self):
        word = self.search

        return os.system(f'start www.merriam-webster.com/dictionary/{word}')

# main code
def english_main():
    lp = Letter_Percentage()
    print(lp.letter_main())
    mla = MLA_Checker()
    print(mla.checker_main())
    mw = Merriam_Webster()
    print(mw.word_search())

# runs main code if file is imported or ran
if __name__ == '__main__':
    english_main()