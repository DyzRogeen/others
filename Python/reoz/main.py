import pygame, asyncio, copy, numpy as np

GRID_WIDTH = 30
GRID_HEIGHT = 30
BOX_SIZE = 20

BLACK = (0, 0, 0)
DEAD = (50, 50, 50)
WHITE = (200, 200, 200)

class gameOfLife:

    def __init__(self):

        pygame.init()
        pygame.font.init()
        pygame.display.set_caption('Example')
        self.screen = pygame.display.set_mode((GRID_WIDTH * BOX_SIZE, GRID_HEIGHT * BOX_SIZE))
        self.clock = pygame.time.Clock()
        self.fps = 60

        self.grid = np.full((GRID_WIDTH, GRID_HEIGHT), 0, dtype=int)

        self.drawGrid()

    def drawGrid(self):
        self.screen.fill(BLACK)

        for i in range(GRID_WIDTH):
            for j in range(GRID_HEIGHT):
                rect = pygame.Rect(i * BOX_SIZE, j * BOX_SIZE, BOX_SIZE, BOX_SIZE)
                pygame.draw.rect(self.screen, WHITE, rect, 1)
        
        pygame.display.flip()

    def changeCell(self, pos):

        x, y = pos[0] // BOX_SIZE, pos[1] // BOX_SIZE

        if self.grid[x][y] == 0:
            self.spawnCell(x, y, self.grid)
        else:
            self.killCell(x, y, self.grid)

        pygame.display.flip()

    def spawnCell(self, x, y, grid):
        rect = pygame.Rect(x * BOX_SIZE, y * BOX_SIZE, BOX_SIZE, BOX_SIZE)
        pygame.draw.rect(self.screen, WHITE, rect)

        grid[x][y] = 1

    def killCell(self, x, y, grid):
        rect = pygame.Rect(x * BOX_SIZE, y * BOX_SIZE, BOX_SIZE, BOX_SIZE)
        pygame.draw.rect(self.screen, DEAD, rect)
        pygame.draw.rect(self.screen, WHITE, rect, 1)

        grid[x][y] = 0

    def step(self):

        new_grid = copy.deepcopy(self.grid)

        for x in range(GRID_WIDTH):
            for y in range(GRID_HEIGHT):

                res = self.check_neighbors(x, y)

                if res == -1:
                    continue
                if res == 0 and new_grid[x][y] != 0:
                    self.killCell(x, y, new_grid)
                elif res == 1 and new_grid[x][y] != 1:
                    self.spawnCell(x, y, new_grid)

        pygame.display.flip()

        self.grid = new_grid

    def check_neighbors(self, x, y):

        cnt = 0
        for i in range(x-1, x+2):
            for j in range(y-1, y+2):
                if i == x and j == y:
                    continue

                new_i =  i % GRID_WIDTH
                new_j =  j % GRID_HEIGHT

                if self.grid[new_i][new_j] == 1:
                    cnt+=1

        return 0 if cnt < 2 or cnt > 3 else (1 if cnt == 3 else -1)

async def main():

    GOL = gameOfLife()

    run = True
    while run:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
            elif event.type == pygame.MOUSEBUTTONDOWN:
                GOL.changeCell(pygame.mouse.get_pos())
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    GOL.step()

        GOL.clock.tick(GOL.fps)

        await asyncio.sleep(0)

asyncio.run(main())