# history module [edwiz]
# created by Chris Taylor [C0SM0] and Jordan

import wikipedia as wiki # pip req

# gets wikipedia summary off of a subject
class Wikipedia():
    def __init__(self, input):
        self.input = input

    def search(self):
        searchable = self.input

        subject = wiki.summary(searchable)

        # error detection
        try:
            return f'{subject}\n\nSource : Wikipedia'

        except wiki.exceptions.DisambiguationError:
            return 'Try Again, An Error Occurred '

# main code
def history_main():
    w = Wikipedia()
    print(w.search())

# runs main code if file is imported or ran
if __name__ == '__main__':
    history_main()