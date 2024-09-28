from tkinter import *
import time
import random
cord = {}
xe = 0
ye = 0
r=0
u=0
t = 0
e=2
x = 350
y = 350
A = Tk()
A.title('Snake')

for r in range (0, 665, 35):
    for t in range (0, 665, 35):
        cord[r,t] = 0

def right(event):
    global x,e,t,r,ye,xe
    if x<665:
        fond.create_rectangle(x-35*xe, y+35*ye, x+35-35*xe, y+35+35*ye, fill='white')
        cord[x, y] = 0
        x = x + 35
        fond.create_rectangle(x, y, x+35, y+35, fill='green')
        cord[x, y] = 1
        A.bind('<Left>', left)
        A.bind('<Up>', up)
        A.bind('<Down>', down)
        if ye != 0:
            if ye<0:
                ye = ye+1
            if ye>0:
                ye = ye-1
        if xe<e+1:
            xe = xe+1
            t = 1
            r = r + 1
            print(ye)
            print(xe)
            print('-')
            print(e+1)
            print(abs(ye) + abs(xe))
            return eat()
        
def left(event):
    global x,e,t,r,ye,xe
    if x != 0:
        fond.create_rectangle(x-35*xe, y+35*ye, x+35-35*xe, y+35+35*ye, fill='white')
        cord[x, y] = 0
        x = x - 35
        fond.create_rectangle(x, y, x+35, y+35, fill='green')
        cord[x, y] = 1
        A.bind('<Right>', right)
        A.bind('<Up>', up)
        A.bind('<Down>', down)
        if ye != 0:
            if ye<0:
                ye = ye+1
            if ye>0:
                ye = ye-1
        if xe>(-1*(e+1)):
            xe = xe-1
        t = 2
        r = r - 1
        print(ye)
        print(xe)
        print('-')
        print(e+1)
        print(abs(ye) + abs(xe))
        return eat()

def up(event):
    global y,e,t,u,ye,xe
    if y != 0:
        fond.create_rectangle(x-35*xe, y+35*ye, x+35-35*xe, y+35+35*ye, fill='white')
        cord[x, y] = 0
        y = y - 35
        fond.create_rectangle(x, y, x+35, y+35, fill='green')
        cord[x, y] = 1
        A.bind('<Left>', left)
        A.bind('<Right>', right)
        A.bind('<Down>', down)
        if xe != 0:
            if xe<0:
                xe = xe+1
            if xe>0:
                xe = xe-1
        if ye<e+1:
            ye = ye+1
        t = 3
        u = u +1
        print(ye)
        print(xe)
        print('-')
        print(e+1)
        print(abs(ye) + abs(xe))
        return eat()

def down(event):
    global y,e,t,u,ye,xe
    if y<665:
        fond.create_rectangle(x-35*xe, y+35*ye, x+35-35*xe, y+35+35*ye, fill='white')
        cord[x, y] = 0
        y = y + 35
        fond.create_rectangle(x, y, x+35, y+35, fill='green')
        cord[x, y] = 1
        A.bind('<Left>', left)
        A.bind('<Up>', up)
        A.bind('<Right>', right)
        if xe != 0:
            if xe<0:
                xe = xe+1
            if xe>0:
                xe = xe-1
        if ye>(-1*(e+1)):
            ye = ye-1
        t = 4
        print(ye)
        print(xe)
        print('-')
        print(e+1)
        print(abs(ye) + abs(xe))
        u = u - 1
        return eat()
    

def eat():
    global w,v,e
    if cord[w, v] == 1:
        w = random.randint(0,665)
        v = random.randint(0,665)
        w = w - (w%35)
        v = v - (v%35)
        fond.create_rectangle(w, v, w+35, v+35, fill='red')
        e = e + 1

fond = Canvas(A, width=700, height=700, bg='white')
fond.pack()

for i in range (35,700,35):
    fond.create_line(i, 0, i, 700, fill='black')
    fond.create_line(0, i, 700, i, fill='black')
while 1:
    A.bind('<Right>', right)
    A.bind('<Left>', left)
    A.bind('<Up>', up)
    A.bind('<Down>', down)
    fond.create_rectangle(x, y, x+35, y+35, fill='green')


    w = random.randint(0,665)
    v = random.randint(0,665)
    w = w - (w%35)
    v = v - (v%35)
    fond.create_rectangle(w, v, w+35, v+35, fill='red')
    cord[w, v] = 2
    if cord[w, v] == 1:
        w = random.randint(0,665)
        v = random.randint(0,665)
        w = w - (w%35)
        v = v - (v%35)
        fond.create_rectangle(w, v, w+35, v+35, fill='red')
        cord[w, v] = 2

    A.mainloop()
    








