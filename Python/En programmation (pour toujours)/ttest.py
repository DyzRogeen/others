from tkinter import *

y1 = y2 = 350
dx=0
dy=0

A = Tk()

def D(event):
    global y1
    if y1 != 570:
        Game.move(p1,0,20)
        y1 = y1+20
        print(y1)
def U(event):
    global y1
    if y1 != 130:
        Game.move(p1,0,-20)
        y1 = y1-20
        print(y1)
def R(event):
    global dx, dy
    dx = 30
    dy = 30
    # while 1:
    #     if dx == 
    Game.move(c, dx, dy)
    A.after(20, R)

Game = Canvas(A, width=1300, height=700, bg="black")
Game.pack()
Game.create_line(650, 0, 650, 700, width=2, dash=(10, 2), fill="white")
p1 = Game.create_rectangle(20, 230, 50, 470, fill="white")
p2 = Game.create_rectangle(1280, 230, 1250, 470, fill="white")
c = Game.create_oval(50, y1-15, 80, y1+15, fill="white")

A.bind('<Up>', U)
A.bind('<Down>', D)
A.bind('<Right>', R)

A.mainloop()
