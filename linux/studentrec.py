# student resources module [edwiz]
# created by Chris Taylor [C0SM0] and Jordan

import os
import platform

# finance class
class Finance():
    def __init__(self, imputation):
        self.imputation = imputation

    # calculates the amount of money for each money type
    def money_calculation(self, amount, val):
        return amount * val

    def money_count_main(self):
        # dictionary of money types and their values
        money_dict = {'pennies':.01, 'nickels':.05, 'dimes':.1, 'quarters':.25, 'half dollars':.5, 'golden dollars':1,
                      'one dollar bills':1, 'two dollar bills':2, 'five dollar bills':5, 'ten dollar bills':10,
                      'twenty dollar bills':20, 'fifty dollar bills':50, 'one hundred dollar bills':100}

        amount_list = []
        total_value = 0

        try:
            for money, value in money_dict.items():

                # user input
                amount = self.imputation

                # value detection
                if amount >= '0':
                    total_amount = self.money_calculation(float(amount), value)
                    amount_list.append(total_amount)

                    # detects if all money types have been used
                    if len(amount_list) == 13:
                        for v in amount_list:
                            total_value += v

                        return f'\nYou Have ${total_value}'

                else:
                    continue

        # exception
        except ValueError:
            return '\nInput Not Recognized, Try Again with a Number.\ni.e "23"'

# class for book related items
class Books:
    def __init__(self, input1, input2, input3):
        self.input1 = input1
        self.input2 = input2
        self.input3 = input3

    def os_detection(self, windows, linux, mac):
        if os.name == 'nt':
            return windows

        elif os.name == 'posix' and 'Linux' in platform.system():
            return linux

        else:
            return mac

    # gets textbook answers using isbn number, typically located above barcode
    def textbook_answers(self):
        isbn_num = self.input1
        page_num = self.input2
        
        textbook_link = f'https://www.slader.com/textbook/{isbn_num}/{page_num}/'

        os_detect = self.os_detection(f'start {textbook_link}', f'firefox "{textbook_link}"', f'open http://{textbook_link}')
        return os.system(os_detect)

    # gets pdf version of books for free
    def free_books(self):
        book_name = self.input3.replace(' ', '%20')

        book_link = f'https://b-ok.cc/s/{book_name}'

        os_detect_book = self.os_detection(f'start {book_link}', f'firefox "{book_link}"', f'open http://{book_link}')
        return os.system(os_detect_book)

# main code
def student_resources_main():
    f = Finance()
    print(f.money_count_main())
    b = Books()
    print(b.textbook_answers())
    print(b.free_books())

# runs main code if file is imported or ran
if __name__ == '__main__':
    student_resources_main()

# input('\nEnter Your Textbook\'s ISBN Number : ')
# input('\nEnter Page Number : ')
# input('\nEnter Book Name : ')