//start is always right, gap always left
//store L-spawning, path

const situations = [[true, "toBottomLeft"], [true, "throughGapStop"],
                    [true, "throughGapReturn"], [true, "toTopRight"],
                    [false, "toBottomLeft"], [false, "throughGapStop"]
                    [false, "throughGapReturn"]];