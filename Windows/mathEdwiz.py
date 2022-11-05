# Geometry module [edwiz]
# Created by Chris Taylor [C0SM0] & Jordan
from tkinter import *
import decimal
import math
from math import sqrt

decimal.getcontext().prec = 10

'''
quadrilateral [square, rectangle]
triangle
circle
'''

class Exponents:
    def __init__(self, exp, exp1):
        self.exp = exp
        self.exp1 = exp1

    def pow2(self):
        p = self.exp

        dub = p**2
        return dub

    def pow3(self):
        p2 = self.exp

        trip = p2**3
        return trip

    def powCustom(self):
        p3 = decimal.Decimal(self.exp)
        p4 = decimal.Decimal(self.exp1)

        if p4 == p4:
            custom = decimal.Decimal(0)
            custom = decimal.Decimal(p3) ** decimal.Decimal(p4)
            return decimal.Decimal(custom)
        elif p4 >= 2500:
            return f"Infinite"
        else:
            return f"System Error"

# algebra class
class Algebra:
    def __init__(self, ini, ini2, ini3, ini4):
        self.ini = ini
        self.ini2 = ini2
        self.ini3 = ini3
        self.ini4 = ini4

    # slope intercept
    def slope_int(self):
        m = self.ini
        b = self.ini2

        y = m + b
        return f"y = {m}x + {b}"

    # slope
    def slope(self):
        y2 = self.ini
        y1 = self.ini2
        x2 = self.ini3
        x1 = self.ini4

        m = (y2 - y1)/(x2 - x1)
        return m

    # rate of change
    def rate_change(self):
        x = self.ini
        y = self.ini2

        roc = x/y
        return roc


# geometry class
class Geometry:
    # initializes variables
    def __init__(self, pi, geofloats, geofloaters, geoFloaterFloating):
        self.pi = pi
        self.geofloats = geofloats
        self.geofloaters = geofloaters
        self.geofloatersfloating = geoFloaterFloating

    # area of quadrilateral
    def quad_area(self):
        l = self.geofloats
        w = self.geofloaters

        area = l * w
        return area

    # perimeter of quadrilateral
    def quad_perimeter(self):
        l = self.geofloats
        w = self.geofloaters

        perimeter = (2 * l) + (2 * w)
        return perimeter

    # area of triangle
    def trig_area(self):
        b = self.geofloats
        h = self.geofloaters

        area = .5 * b * h
        return area

    # hypotenuse of triangle
    def trig_hypo(self):
        print('\nEnter the legs of the triangle : ')
        a = self.geofloats
        b = self.geofloaters

        c = sqrt(a ** 2 + b ** 2)
        return c

    # perimeter of triangle
    def trig_perimeter(self):
        a = self.geofloats
        b = self.geofloaters
        c = self.geofloatersfloating

        perimeter = a + b + c
        return perimeter

    # area of circle
    def circ_area(self):
        r = self.geofloats
        area = self.pi * r ** 2

        return area

    # circumference of circle
    def circ_circumference(self):
        d = self.geofloats
        c = self.pi * d

        return c

    # diameter of circle
    def circ_diameter(self):
        c = self.geofloats
        d = c / self.pi

        return d

    # sector area of circle
    def sector_area(self):
        r = self.geofloats
        a = self.geofloaters
        sector_area = a / 360 * self.pi * r ** 2

        return sector_area

# main code
def math_main():
    # classes as variables
    alg = Algebra()
    geo = Geometry(3.14)

    while True:
        # user input
        option = input('\nChoose a Mathematical Calculation?\n'
                       '===Algebra===\n\t'
                       '[a1] Slope Intercept\n\t'
                       '[a2] Slope\n\t'
                       '[a3] Rate of Change\n\n'
                       
                       '===Geometry & Trigonometry===\n'
                       '[+] Quadrilateral\n\t'
                       '[q1] Area \n\t'
                       '[q2] Perimeter\n\n'   
                       
                       '[+] Trigonometry\n\t'
                       '[t1] Area \n\t'
                       '[t2] Hypotenuse\n\t'
                       '[t3] Perimeter\n\n'
                       
                       '[+] Circle\n\t'
                       '[c1] Area of a Circle\n\t'
                       '[c2] Circumference\n\t'
                       '[c3] Diameter\n\t'
                       '[c4] Sector Area\n\n'
                       
                       '[00] Exit\n\n'
                       '[~] Option : ')
        print('\n')

        # slope intercept, algebra
        if option == 'a1' or option == 'A1':
            a1 = alg.slope_int()
            print(f'The Slope Intercept is {a1}')
            break

        # slope, algebra
        elif option == 'a2' or option == 'A1':
            a2 = alg.slope()
            print(f'The Slope is {a2}')
            break

        # rate of change, algebra
        elif option == 'a3' or option == 'A3':
            a3 = alg.rate_change()
            print(f'The Rate of Change is {a3}')
            break

        # quadrilateral area, geometry
        elif option == 'q1' or option == 'Q1':
            q1 = geo.quad_area()
            return (f'The Area is {q1}')
            break

        # quadrilateral perimeter, geometry
        elif option == 'q2' or option == 'Q2':
            q2 = geo.quad_perimeter()
            print(f'The perimeter is {q2}')
            break

        # triangle area, geometry
        elif option == 't1' or option == 'T1':
            t1 = geo.trig_area()
            print(f'The Area is {t1}')
            break

        # triangle hypotenuse, geometry
        elif option == 't2' or option == 'T2':
            t2 = geo.trig_hypo()
            print('\nThe length of the Hypotenuse is : %.3f' % t2)
            break

        # triangle perimeter, geometry
        elif option == 't3' or option == 'T3':
            t3 = geo.trig_perimeter()
            print(f'The Perimeter is {t3}')
            break

        # circle area, geometry
        elif option == 'c1' or option == 'C1':
            c1 = geo.circ_area()
            print('The Area is : %.2f \n' % c1)
            break

        # circle circumference, geometry
        elif option == 'c2' or option == 'C2':
            c2 = geo.circ_circumference()
            print('Perimeter of the circle is %.2f \n' % c2)
            break

        # circle diameter, geometry
        elif option == 'c3' or option == 'C3':
            c3 = geo.circ_diameter()
            print('The diameter is : %.2f \n' % c3)
            break

        # circle sector area, geometry
        elif option == 'c4' or option == 'C4':
            c4 = geo.sector_area()
            print('\nThe area of the sector is %.2f \n' % c4)
            break

        # exit
        elif option == '00':
            print('Exiting...')
            break

        # exception
        else:
            print('Output Not Recognized, Try Again!\n')
            break

# runs code if file is ran or imported
if __name__ == '__main__':
    math_main()

