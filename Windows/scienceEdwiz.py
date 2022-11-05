# science module [edwiz]
# Created by Chris Taylor [C0SM0] & Jordan Wallace
from periodictable import * # pip req

class Chemistry:
    def __init__(self, electron):
        self.electron = electron

    # checks the number of valence electrons in atom
    def valence_checker(self, electrons):
        # periodic groups with atomic numbers
        group_1 = [1, 3, 11, 19, 37, 55, 87]
        group_2 = [4, 12, 20, 38, 56, 88]
        group_3 = [21, 39, 57, 58, 59,60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103]
        group_4 = [22, 40, 72, 104]
        group_5 = [23, 41, 73, 105]
        group_6 = [24, 42, 74, 106]
        group_7 = [25, 43, 75, 107]
        group_8 = [26, 44, 76, 108]
        group_9 = [27, 45, 77, 709]
        group_10 = [28, 46, 78, 110]
        group_11 = [29, 47, 79, 111]
        group_12 = [30, 48, 80, 112]
        group_13 = [5, 13, 31, 49, 81, 113]
        group_14 = [6, 14, 32, 50, 82, 114]
        group_15 = [7, 15, 33, 51, 83, 115]
        group_16 = [8, 16, 34, 52, 84, 116]
        group_17 = [9, 17, 35, 53, 85, 117]
        group_18 = [2, 10, 18, 16, 54, 86, 118]

        # return the number of valence electrons depending on group
        if electrons in group_1:
            return 1

        elif electrons in group_2:
            return 2

        # Lanthanides, Actinide, group 3
        elif electrons in group_3:
                return 2

        elif electrons in group_4:
                return 2

        elif electrons in group_5:
            if electrons == 41:
                return 1
            else:
                return 2

        elif electrons in group_6:
            if electrons == 24  or electrons == 42:
                return 1
            else:
                return 2

        elif electrons in group_7:
            if electrons == 43:
                return 1
            else:
                return 2

        elif electrons in group_8:
            if electrons == 44:
                return 1
            else:
                return 2

        elif electrons in group_9:
            if electrons == 45:
                return 1
            else:
                return 2

        elif electrons in group_10:
            if electrons == 46:
                return 18
            elif electrons == 78:
                return 1
            else:
                return 2

        elif electrons in group_11:
            if electrons == 111:
                return 2
            else:
                return 1

        elif electrons in group_12:
            return 2

        elif electrons in group_13:
            return 3

        elif electrons in group_14:
            return 4

        elif electrons in group_15:
            return 5

        elif electrons in group_16:
            return 6

        elif electrons in group_17:
            return 7

        # noble gases, octets
        elif electrons in group_18:
            if electrons == 2:
                noble_gas = 2
            else:
                noble_gas = 8

            return f'Noble Gas, {noble_gas}'

        # exception
        else:
            return None

    # gets basic element information, option 1
    def element_info(self):
        element_name = self.electron

        for el in elements:
            # gets element parts
            symbol = el.symbol
            name = el.name
            atomic_number = el.number
            atomic_mass = el.mass
            valence_electron = self.valence_checker(int(atomic_number))

            # formats elements
            if symbol == element_name or name == element_name:
                output_name = f'Element : {name}\n'
                output_symbol = f'Symbol : {symbol}\n'
                output_number = f'Atomic Number : {atomic_number}\n'
                output_mass = f'Atomic Mass : {atomic_mass}\n'
                output_valence = f'Valence Electrons : {valence_electron}\n'

                # outputs element information
                return output_name+output_symbol+output_number+output_mass+output_valence

# main code
def science_main():
    chem = Chemistry()

    while True:
        # user input
        option = input()

        # outputs element info, option 1
        if option == '1':
            return chem.element_info()
            break

        # outputs periodic table of elements, option 2
        elif option == '2':
            return chem.p_table()
            break

        # exception
        else:
            print('\nInput Not Recognized, Try Again!')
            continue

# runs main code if file is imported or ran
if __name__ == '__main__':
    science_main()