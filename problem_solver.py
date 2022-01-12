premade_grid = [[0,2,0,8,5,0,0,0,0],
        [9,0,0,0,3,0,0,0,7],
        [0,8,3,7,1,0,2,0,0],
        [0,0,0,0,0,0,0,0,0],
        [2,0,6,3,4,0,8,0,0],
        [0,0,1,0,9,0,0,4,0],
        [0,3,0,5,0,0,4,0,0],
        [0,0,0,0,7,3,0,0,2],
        [0,0,4,0,0,1,5,0,0]]

# grid = [[9,1,7,2,5,4,0,0,0],
#         [4,0,2,0,8,0,0,0,0],
#         [6,5,0,0,0,3,4,0,0],
#         [0,0,3,0,9,0,2,5,6],
#         [5,0,0,7,0,0,3,0,9],
#         [2,0,0,0,0,5,0,7,1],
#         [0,2,0,5,3,0,7,6,0],
#         [3,7,0,1,6,0,0,9,8],
#         [0,0,0,0,0,0,0,3,0]]

def possible(y,x,n,grid):
   
    for i in range(0,9):
        if grid[y][i] == n:
            return False
    for i in range(0,9):
        if grid[i][x] == n:
            return False
    x0 = (x//3)*3
    y0 = (y//3)*3
    for i in range(0,3):
        for j in range(0,3):
            if grid[y0+i][x0+j] == n:
                return False
    return True

def solve(grid):
    for y in range(9):
        for x in range(9):
            if grid[y][x] == 0:
                for n in range(1,10):
                    if possible(y,x,n,grid):
                        grid[y][x] = n
                        attempted_solution = solve(grid)
                        if attempted_solution == False:
                            grid[y][x] = 0
                        else:
                            return attempted_solution
                return False
    return grid


print(solve(premade_grid))
print(2//3)