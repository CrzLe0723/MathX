

/**
 * Game Math Toolkit for MakeCode Arcade
 * Smooth motion, physics, and effects utilities
 */
//% weight=100 //% color=#2E86FF icon="\uf201" //% groups=['Constants','Trigonometry','Create','Use','Variables','Advanced']
namespace MathX {
    //% blockId=mathx_easing_mode
    export enum EasingMode {
        //% block="linear"
        Linear = 0,
        //% block="ease in"
        EaseIn = 1,
        //% block="ease out"
        EaseOut = 2,
        //% block="ease in out"
        EaseInOut = 3
    }

    //% blockId=mathx_wave_type
    export enum WaveType {
        //% block="sine"
        Sine = 0,
        //% block="cosine"
        Cosine = 1,
        //% block="bounce"
        Bounce = 2
    }

    //% blockId=mathx_direction_mode
    export enum DirectionMode {
        //% block="toward"
        Toward = 0,
        //% block="away"
        Away = 1,
        //% block="orbit"
        Orbit = 2
    }

    //% blockId=mathx_constants
    export enum Constants {

        //% block="π"
        PI = 0,

        //% block="e"
        E = 1,

        //% block="ln(2)"
        LN2 = 2,

        //% block="ln(10)"
        LN10 = 3,

        //% block="log₂(e)"
        LOG2E = 4,

        //% block="log₁₀(e)"
        LOG10E = 5,

        //% block="√½"
        SQRT_1_2 = 6,

        //% block="√2"
        SQRT2 = 7,

        //% block="τ"
        TAU = 8,

        //% block="φ (golden ratio)"
        PHI = 9,

        //% block="1/π"
        INV_PI = 10,

        //% block="2/π"
        TWO_OVER_PI = 11,

        //% block="π/2"
        HALF_PI = 12,

        //% block="π/4"
        QUARTER_PI = 13,

        //% block="180/π"
        RAD_TO_DEG = 14,

        //% block="π/180"
        DEG_TO_RAD = 15,

        //% block="√3"
        SQRT3 = 16,

        //% block="∛2"
        CBRT2 = 17,

        //% block="Euler-Mascheroni γ"
        GAMMA = 18,

        //% block="Apéry ζ(3)"
        APERY = 19
    }
    //Vars
    let formulaVars: { [key: string]: string } = {}
    let tempVars: { [key: string]: number } = {}


    //---SUBCATEGORY MOTION---


    //---Group Movement---
    /**
    * Linear interpolation
    */
    //% blockId=mathx_lerp
    //% block="lerp $a to $b by $t"
    //% subcategory="Motion"
    //% group="Interpolation"
    export function lerp(a: number, b: number, t: number): number {
        return a + (b - a) * t
    }

    /**
     * Smooth easing lerp
     */
    //% blockId=mathx_lerp_ease
    //% block="lerp $a to $b by $t easing $mode"
    //% subcategory="Motion"
    //% group="Interpolation"
    export function lerpEase(a: number, b: number, t: number, mode: EasingMode): number {
        if (mode == EasingMode.EaseIn) t *= t
        else if (mode == EasingMode.EaseOut) t = 1 - (1 - t) * (1 - t)
        else if (mode == EasingMode.EaseInOut)
            t = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

        return a + (b - a) * t
    }

    /**
     * Smooth follow
     */
    //% blockId=mathx_smooth
    //% block="smooth $current toward $target by $speed"
    //% subcategory="Motion"
    //% group="Interpolation"
    export function smooth(current: number, target: number, speed: number): number {
        return current + (target - current) * speed
    }

    /**
     * Approach value
     */
    //% blockId=mathx_approach
    //% block="approach $current to $target by $speed"
    //% subcategory="Motion"
    //% group="Interpolation"
    export function approach(current: number, target: number, speed: number): number {
        return current < target
            ? Math.min(current + speed, target)
            : Math.max(current - speed, target)
    }
    
    /**
     * Spiral motion (radius grows over time)
     * @param t time
     * @param speed rotation speed
     * @param growth spiral growth rate
     */
    //% blockId=mathx_spiral
    //% block="spiral time $t speed $speed growth $growth"
    //% subcategory="Motion"
    //% color=#8E44AD
    export function spiral(t: number, speed: number, growth: number): number {
        return Math.cos(t * speed) * (t * growth)
    }
    /**
     * Applies damping (friction) to a value
     * @param value input value
     * @param factor damping strength (0-1)
     */
    //% blockId=mathx_damp
    //% block="damp $value by $factor"
    //% subcategory="Physics"
    //% color=#34495E
    export function damp(value: number, factor: number): number {
        return value * (1 - factor)
    }
    /**
     * Creates bounce effect
     * @param t time
     * @param strength bounce strength
     */
    //% blockId=mathx_bounce
    //% block="bounce time $t strength $strength"
    //% subcategory="Effects"
    //% color=#E67E22
    export function bounce(t: number, strength: number): number {
        return Math.abs(Math.sin(t)) * strength
    }
    /**
     * Normalize a value toward -1 to 1 range
     * @param x value
     * @param max max range
     */
    //% blockId=mathx_vector
    //% block="vector x $x y $y"
    //% subcategory="Vector"
    //% color=#2ECC71
    //% x.defl=0
    //% y.defl=0
    //% x.shadow=math_number
    //% y.shadow=math_number
    export function normalize(x: number, max: number): number {
        return x / max
    }
    /**
     * Direction from A to B
     * @param x1 start x
     * @param y1 start y
     * @param x2 target x
     * @param y2 target y
     */
    //% blockId=mathx_direction
    //% block="direction from ($x1,$y1) to ($x2,$y2)"
    //% subcategory="Vector"
    //% color=#2ECC71
    export function direction(x1: number, y1: number, x2: number, y2: number): number {
        return Math.atan2(y2 - y1, x2 - x1)
    }
    /**
     * Directional movement helper
     */
    //% blockId=mathx_direction_Move
    //% block="move $sprite $mode toward $target speed $speed"
    //% subcategory="AI"
    //% color=#E67E22
    //% sprite.shadow=variables_get sprite.defl=sprite
    //% target.shadow=variables_get target.defl=target
    export function directionMove(sprite: Sprite, mode: DirectionMode, target: Sprite, speed: number): void {

        let dx = target.x - sprite.x
        let dy = target.y - sprite.y

        if (mode == DirectionMode.Away) {
            dx = -dx
            dy = -dy
        }

        if (mode == DirectionMode.Orbit) {
            let angle = game.runtime() / 1000
            sprite.x += Math.cos(angle) * speed
            sprite.y += Math.sin(angle) * speed
            return
        }

        let dist = Math.sqrt(dx * dx + dy * dy)
        if (dist == 0) return

        sprite.vx = (dx / dist) * speed
        sprite.vy = (dy / dist) * speed
    }
    /**
     * Create a vector
     */
    //% blockId=mathx_vector
    //% block="vector x $x y $y"
    //% subcategory="Vector"
    //% color=#2ECC71
    export function vector(x: number, y: number): { x: number, y: number } {
        return { x: x, y: y }
    }
    /**
     * Move sprite toward another sprite
     */
    //% blockId=mathx_move_toward_sprite
    //% block="move $sprite toward $target speed $speed"
    //% subcategory="Movement"
    //% color=#3498DB
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% target.shadow=variables_get
    //% target.defl=target
    //% speed.defl=50
    export function moveTowardSprite(sprite: Sprite, target: Sprite, speed: number): void {
        let dx = target.x - sprite.x
        let dy = target.y - sprite.y
        let dist = Math.sqrt(dx * dx + dy * dy)

        if (dist == 0) return

        sprite.vx = (dx / dist) * speed
        sprite.vy = (dy / dist) * speed
    }
    /**
     * Check if within distance
     */
    //% blockId=mathx_in_range
    //% block="$sprite is within $dist of $target"
    //% subcategory="Logic"
    //% color=#9B59B6
    //% sprite.shadow=variables_get
    //% sprite.defl=Object
    //% target.shadow=variables_get
    //% target.defl=target
    //% dist.defl=50
    export function inRange(sprite: Sprite, target: Sprite, dist: number): boolean {
        let dx = target.x - sprite.x
        let dy = target.y - sprite.y
        return dx * dx + dy * dy <= dist * dist
    }
    /**
     * Simple chase AI
     */
    //% blockId=mathx_chase
    //% block="make $enemy chase $target speed $speed"
    //% subcategory="AI"
    //% color=#E67E22
    //% enemy.shadow=variables_get
    //% enemy.defl=enemy
    //% target.shadow=variables_get
    //% target.defl=player
    //% speed.defl=50
    export function chase(enemy: Sprite, target: Sprite, speed: number): void {
        moveTowardSprite(enemy, target, speed)
    }
    /**
     * Floating item effect
     */
    //% blockId=mathx_float
    //% block="float $sprite height $h speed $s"
    //% subcategory="Effects"
    //% color=#E67E22
    //% sprite.shadow=variables_get
    //% sprite.defl=mySprite
    //% h.defl=5
    //% s.defl=2
    export function float(sprite: Sprite, h: number, s: number): void {
        let t = game.runtime() / 1000
        sprite.y += Math.sin(t * s) * h
    }

    /**
     * Predict future position
     * @param x current x
     * @param vx velocity x
     * @param t time ahead
     */
    //% blockId=mathx_predict
    //% block="predict $x velocity $vx time $t"
    ///% subcategory="AI"
    //% color=#16A085
    export function predict(x: number, vx: number, t: number): number {
        return x + vx * t
    }
    /**
     * Spring motion toward target
     * @param current current value
     * @param target target value
     * @param stiffness strength
     */
    //% blockId=mathx_spring
    //% block="spring $current to $target stiffness $stiffness"
    //% subcategory="Physics"
    //% color=#2980B9
    export function spring(current: number, target: number, stiffness: number): number {
        return current + (target - current) * stiffness
    }
    /**
     * Shake effect
     * @param t time
     * @param intensity shake amount
     */
    //% blockId=mathx_shake
    //% block="shake time $t intensity $intensity"
    //% subcategory="Effects"
    //% color=#C0392B
    export function shake(t: number, intensity: number): number {
        return (Math.random() * 2 - 1) * intensity
    }
    /**
     * Smooth easing motion
     * @param t time
     */
    //% blockId=mathx_ease
    //% block="ease time $t"
    //% subcategory="Motion"
    //% group="Interpolation"
    //% color=#2E86FF
    export function ease(t: number): number {
        return t * t * (3 - 2 * t)
    }
    /**
     * Restrict a value between min and max
     * @param value input value
     * @param min minimum allowed value
     * @param max maximum allowed value
     */
    //% blockId=mathx_clamp
    //% block="clamp $value between $min and $max"
    //% subcategory="Utility"
    //% color=#2ECC71
    export function clamp(value: number, min: number, max: number): number {
        return Math.min(max, Math.max(min, value))
    }
    
    /**
     * Convert a value from one range to another
     * @param value input value
     * @param a1 input min
     * @param a2 input max
     * @param b1 output min
     * @param b2 output max
     */
    //% blockId=mathx_map
    //% block="map $value from $a1 to $a2 into $b1 to $b2"
    //% subcategory="Utility"
    //% color=#2ECC71
    export function map(value: number, a1: number, a2: number, b1: number, b2: number): number {
        return b1 + (value - a1) * (b2 - b1) / (a2 - a1)
    }
    


    //---GEOMETRY---

    /**
     * Distance between two points
     * @param x1 first x
     * @param y1 first y
     * @param x2 second x
     * @param y2 second y
     */
    //% blockId=mathx_distance
    //% block="distance from ($x1,$y1) to ($x2,$y2)"
    //% subcategory="Geometry"
    export function distance(x1: number, y1: number, x2: number, y2: number): number {
        let dx = x2 - x1
        let dy = y2 - y1
        return Math.sqrt(dx * dx + dy * dy)
    }

    /**
     * Angle between two points
     * @param x1 first x 
     * @param y1 first y
     * @param x2 second x 
     * @param y2 second y
     */
    //% blockId=mathx_angle
    //% block="angle from ($x1,$y1) to ($x2,$y2)"
    //% subcategory="Geometry"
    export function angle(x1: number, y1: number, x2: number, y2: number): number {
        return Math.atan2(y2 - y1, x2 - x1)
    }



    /**
     * X position in circular motion
     * @param t time
     * @param r radius
     * @param s speed
     */
    //% blockId=mathx_orbitx
    //% block="orbit X time $t radius $r speed $s"
    //% subcategory="Motion"
    //% color=#9B59B6
    export function orbitX(t: number, r: number, s: number): number {
        return Math.cos(t * s) * r
    }
    /**
     * Y position in circular motion
     * @param t time
     * @param r radius
     * @param s speed
     */
    //% blockId=mathx_orbity
    //% block="orbit Y time $t radius $r speed $s"
    //% subcategory="Motion"
    //% color=#9B59B6
    export function orbitY(t: number, r: number, s: number): number {
        return Math.sin(t * s) * r
    }
    /**
     * Vertical floating motion
     * @param t time
     * @param h height
     * @param s speed
     */
    //% blockId=mathx_bob
    //% block="bob time $t height $h speed $s"
    //% subcategory="Motion"
    //% color=#9B59B6
    export function bob(t: number, h: number, s: number): number {
        return Math.sin(t * s) * h
    }
    /**
     * Scale pulsing effect
     * @param t time
     * @param s speed
     * @param a amplitude
     */
    //% blockId=mathx_pulse
    //% block="pulse time $t speed $s amount $a"
    //% subcategory="Effects"
    //% color=#E74C3C
    export function pulse(t: number, s: number, a: number): number {
        return 1 + Math.sin(t * s) * a
    }
    /**
     * Small shake / jitter motion
     * @param t time
     * @param s speed
     * @param a amount
     */
    //% blockId=mathx_wiggle
    //% block="wiggle time $t speed $s amount $a"
    //% subcategory="Effects"
    //% color=#E74C3C
    export function wiggle(t: number, s: number, a: number): number {
        return Math.sin(t * s) * a
    }
    /**
     * Physics integration step
     * @param p position
     * @param v velocity
     * @param dt delta time
     */
    //% blockId=mathx_integrate
    //% block="integrate position $p velocity $v dt $dt"
    //% subcategory="Physics"
    //% color=#2E86FF
    export function integrate(p: number, v: number, dt: number): number {
        return p + v * dt
    }
    /**
     * Get the time in seconds
     */
    //% blockId=mathx_time_seconds
    //% block="game time (seconds)"
    //% subcategory="Time"
    export function timeSeconds(): number {
        return game.runtime() / 1000
    }

    /**
     * Get the time in ms
     */
    //% blockId=mathx_time_ms
    //% block="game time (ms)"
    //% subcategory="Time"
    export function timeMs(): number {
        return game.runtime()
    }

    let _lastTime = game.runtime()

    /**
     * Get the dt time
     */
    //% blockId=mathx_delta_time
    //% block="delta time"
    //% subcategory="Time"
    export function deltaTime(): number {
        let now = game.runtime()
        let dt = (now - _lastTime) / 1000
        _lastTime = now
        return dt
    }

    /**
     * Repeating wave timer (0-1 looping)
     * @param speed speed of loop
     */
    //% blockId=mathx_loop_time
    //% block="loop time speed $speed"
    //% subcategory="Time"
    //% color=#1ABC9C
    export function loopTime(speed: number): number {
        return (game.runtime() / 1000 * speed) % 1
    }

    let _stopwatches: { [key: string]: number } = {}

    /**
     * Start a stopwatch
     */
    //% blockId=mathx_stopwatch_start
    //% block="start stopwatch $key"
    //% subcategory="Time"
    //% color=#1ABC9C
    export function startStopwatch(key: string): void {
        _stopwatches[key] = game.runtime()
    }

    /**
     * Read stopwatch time (ms)
     */
    //% blockId=mathx_stopwatch_read
    //% block="stopwatch $key time"
    ///% subcategory="Time"
    //% color=#1ABC9C
    export function readStopwatch(key: string): number {
        if (!_stopwatches[key]) return 0
        return game.runtime() - _stopwatches[key]
    }
    /**
     * Returns velocity toward a target (seek behavior)
     * @param x current x
     * @param y current y
     * @param tx target x
     * @param ty target y
     * @param speed movement speed
     */
    //% blockId=mathx_ai_seek
    //% block="seek from ($x,$y) to ($tx,$ty) speed $speed"
    //% subcategory="AI"
    //% color=#16A085
    export function seek(x: number, y: number, tx: number, ty: number, speed: number): { vx: number, vy: number } {
        let dx = tx - x
        let dy = ty - y
        let dist = Math.sqrt(dx * dx + dy * dy)

        if (dist == 0) return { vx: 0, vy: 0 }

        return {
            vx: (dx / dist) * speed,
            vy: (dy / dist) * speed
        }
    }
    /**
     * Flee away from a target
     * @param x current x
     * @param y current y
     * @param tx threat x
     * @param ty threat y
     * @param speed movement speed
     */
    //% blockId=mathx_ai_flee_return
    //% block="flee from ($tx,$ty) at ($x,$y) speed $speed"
    //% subcategory="AI"
    //% color=#E74C3C
    export function fleeReturn(x: number, y: number, tx: number, ty: number, speed: number): { vx: number, vy: number } {
        let dx = x - tx
        let dy = y - ty
        let dist = Math.sqrt(dx * dx + dy * dy)

        if (dist == 0) return { vx: 0, vy: 0 }

        return {
            vx: (dx / dist) * speed,
            vy: (dy / dist) * speed
        }
    }
    /**
     * Flee from target
     * @param sprite the object that is running away from the target
     * @param target the object the the sprite is running away from
     * @param speed how fast the sprite to run away
     */
    //% blockId=mathx_ai_flee
    //% block="flee $sprite from $target speed $speed"
    //% subcategory="AI"
    //% color=#E74C3C
    //% sprite.shadow=variables_get sprite.defl=AI
    //% target.shadow=variables_get target.defl=target
    export function flee(sprite: Sprite, target: Sprite, speed: number): void {
        let dx = sprite.x - target.x
        let dy = sprite.y - target.y
        let dist = Math.sqrt(dx * dx + dy * dy)

        sprite.vx = (dx / dist) * speed
        sprite.vy = (dy / dist) * speed
    }
    /**
     * Move toward target but slow down near it
     * @param x current x
     * @param y current y
     * @param tx target x
     * @param ty target y
     * @param radius slow down radius
     */
    //% blockId=mathx_ai_arrive
    //% block="arrive at ($tx,$ty) from ($x,$y) radius $radius"
    //% subcategory="AI"
    //% color=#3498DB
    export function arrive(x: number, y: number, tx: number, ty: number, radius: number): { vx: number, vy: number } {
        let dx = tx - x
        let dy = ty - y
        let dist = Math.sqrt(dx * dx + dy * dy)

        if (dist == 0) return { vx: 0, vy: 0 }

        let speed = dist < radius ? dist / radius : 1

        return {
            vx: (dx / dist) * speed,
            vy: (dy / dist) * speed
        }
    }
    let _wanderAngle = 0

    /**
     * Random smooth wandering movement
     * @param speed movement speed
     * @param change how fast direction changes
     */
    //% blockId=mathx_ai_wander
    //% block="wander speed $speed change $change"
    //% subcategory="AI"
    //% color=#9B59B6
    export function wander(speed: number, change: number): { vx: number, vy: number } {
        _wanderAngle += (Math.random() - 0.5) * change

        return {
            vx: Math.cos(_wanderAngle) * speed,
            vy: Math.sin(_wanderAngle) * speed
        }
    }
    /**
     * Smooth steering toward direction
     * @param currentAngle current angle
     * @param targetAngle target angle
     * @param speed turning speed
     */
    //% blockId=mathx_ai_steer
    //% block="steer $currentAngle toward $targetAngle speed $speed"
    //% subcategory="AI"
    //% color=#2ECC71
    export function steer(currentAngle: number, targetAngle: number, speed: number): number {
        let diff = targetAngle - currentAngle

        // normalize angle
        while (diff > Math.PI) diff -= Math.PI * 2
        while (diff < -Math.PI) diff += Math.PI * 2

        return currentAngle + diff * speed
    }
    /**
     * Smooth follow movement toward target position
     * @param x current x
     * @param y current y
     * @param tx target x
     * @param ty target y
     * @param smoothing 0-1
     */
    //% blockId=mathx_ai_follow
    //% block="follow ($tx,$ty) from ($x,$y) smoothing $smoothing"
    //% subcategory="AI"
    //% color=#1ABC9C
    export function follow(x: number, y: number, tx: number, ty: number, smoothing: number): { x: number, y: number } {
        return {
            x: x + (tx - x) * smoothing,
            y: y + (ty - y) * smoothing
        }
    }

    /**
     * Apply squash & stretch effect to a sprite
     * @param sprite target sprite
     * @param sx squash X (0-2)
     * @param sy squash Y (0-2)
     */
    //% blockId=mathx_squashstretch
    //% block="squash $sprite x $sx y $sy"
    //% subcategory="Juice"
    //% color=#F39C12
    //% sprite.shadow=variables_get
    //% sprite.defl=Object
    export function squash(sprite: Sprite, sx: number, sy: number): void {
        sprite.setScale(sx, sy)
    }
    /**
     * Reset sprite scale to normal
     * @param sprite target sprite
     */
    //% blockId=mathx_squashreset
    //% block="reset squash $sprite"
    //% subcategory="Juice"
    //% color=#F39C12
    //% sprite.shadow=variables_get
    //% sprite.defl=Object
    export function resetSquash(sprite: Sprite): void {
        sprite.setScale(1, 1)
    }

    /**
     * Apply recoil force to sprite
     * @param sprite target sprite
     * @param angle direction in radians
     * @param strength force amount
     */
    //% blockId=mathx_recoil
    //% block="recoil $sprite angle $angle strength $strength"
    //% subcategory="Physics"
    //% color=#9B59B6
    //% sprite.shadow=variables_get sprite.defl=mySprite
    //% angle.defl=0
    //% strength.defl=50
    export function recoil(sprite: Sprite, angle: number, strength: number): void {
        let vx = Math.cos(angle) * strength
        let vy = Math.sin(angle) * strength

        sprite.vx += vx
        sprite.vy += vy
    }
    /**
     * Knockback away from a point
     * @param sprite target sprite
     * @param x source x
     * @param y source y
     * @param strength force
     */
    //% blockId=mathx_recoil_point
    //% block="knockback $sprite from ($x,$y) strength $strength"
    //% subcategory="Physics"
    //% sprite.shadow=variables_get sprite.defl=AI
    //% color=#9B59B6
    export function recoilFrom(sprite: Sprite, x: number, y: number, strength: number): void {
        let dx = sprite.x - x
        let dy = sprite.y - y
        let dist = Math.sqrt(dx * dx + dy * dy)

        if (dist == 0) return

        sprite.vx += (dx / dist) * strength
        sprite.vy += (dy / dist) * strength
    }
    let aiMemory: {
        [id: number]: { lastX: number, lastY: number, time: number }
    } = {}

    //% blockId=mathx_ai_see
    //% block="remember $enemy saw $target"
    //% subcategory="AI"
    //% enemy.shadow=variables_get sprite.defl=AI 
    //% target.shadow=variables_get sprite.defl=AI
    export function rememberSeen(enemy: Sprite, target: Sprite): void {
        aiMemory[enemy.id] = {
            lastX: target.x,
            lastY: target.y,
            time: game.runtime()
        }
    }

    //% blockId=mathx_ai_lastx
    //% block="$enemy last seen X"
    //% subcategory="AI"
    //% enemy.shadow=variables_get sprite.defl=AI
    export function lastSeenX(enemy: Sprite): number {
        return aiMemory[enemy.id].lastX || enemy.x
    }

    //% blockId=mathx_ai_lasty
    //% block="$enemy last seen Y"
    //% subcategory="AI"
    //% enemy.shadow=variables_get sprite.defl=AI
    export function lastSeenY(enemy: Sprite): number {
        return aiMemory[enemy.id].lastY || enemy.y
    }
    /**
     * Check if sprite can see target
     */
    //% blockId=mathx_ai_can_see
    //% block="$sprite can see $target within $range"
    //% subcategory="AI"
    //% sprite.shadow=variables_get sprite.defl=AI
    //% target.shadow=variables_get sprite.defl=target
    //% color=#3498DB
    export function canSee(sprite: Sprite, target: Sprite, range: number): boolean {
        let dx = target.x - sprite.x
        let dy = target.y - sprite.y
        return dx * dx + dy * dy <= range * range
    }
    /**
     * Check if target is "heard"
     */
    //% blockId=mathx_ai_hear
    //% block="$sprite hears $target within $range"
    //% subcategory="AI"
    //% sprite.shadow=variables_get sprite.defl=AI
    //% target.shadow=variables_get sprite.defl=target
    export function hears(sprite: Sprite, target: Sprite, range: number): boolean {
        let dx = target.x - sprite.x
        let dy = target.y - sprite.y
        return dx * dx + dy * dy <= range * range
    }
    let patrolTargets: {
        [id: number]: { x: number, y: number }
    } = {}
    /**
     * Set patrol target
     */
    //% blockId=mathx_ai_patrol_set
    //% block="set $sprite patrol target range $range"
    //% subcategory="AI"
    //% sprite.shadow=variables_get sprite.defl=AI
    export function setPatrol(sprite: Sprite, range: number): void {
        patrolTargets[sprite.id] = {
            x: sprite.x + randint(-range, range),
            y: sprite.y + randint(-range, range)
        }
    }
    /**
     * Patrol movement
     */
    //% blockId=mathx_ai_patrol_move
    //% block="patrol $sprite speed $speed"
    //% subcategory="AI"
    //% sprite.shadow=variables_get sprite.defl=AI
    export function patrol(sprite: Sprite, speed: number): void {
        let target = patrolTargets[sprite.id]

        if (!target) {
            setPatrol(sprite, 40)
            return
        }

        let dx = target.x - sprite.x
        let dy = target.y - sprite.y
        let dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 5) {
            setPatrol(sprite, 40)
            return
        }

        sprite.vx = (dx / dist) * speed
        sprite.vy = (dy / dist) * speed
    }


    //---Trigonometry---
    /**
    * Hyperbolic sine
    * Smooth exponential growth (good for acceleration curves)
    */
    //% blockId=mathx_sinh
    //% block="sinh $theta"
    //% group=Hyperbolic
    //% subcategory="Trigonometry"
    export function sinh(theta: number): number {
        return (Math.exp(theta) - Math.exp(-theta)) / 2
    }

    /**
     * Hyperbolic cosine
     * Always positive, useful for symmetric curves
     */
    //% blockId=mathx_cosh
    //% block="cosh $theta"
    //% group=Hyperbolic
    //% subcategory="Trigonometry"
    export function cosh(theta: number): number {
        return (Math.exp(theta) + Math.exp(-theta)) / 2
    }

    /**
     * Hyperbolic tangent
     * Smoothly clamps between -1 and 1 (AMAZING for AI + smoothing)
     */
    //% blockId=mathx_tanh
    //% block="tanh $theta" 
    //% subcategory="Trigonometry"
    //% group="Hyperbolic"
    export function tanh(theta: number): number {
        let ex = Math.exp(theta)
        let enx = Math.exp(-theta)
        return (ex - enx) / (ex + enx)
    }
    /**
    * Returns the hyperbolic cotangent of an angle.
    * Hyperbolic cotangent is the reciprocal of hyperbolic tangent.
    * @param radians number
    */
    //% blockId=mathx_coth
    //% block="hyperbolic cotangent of $radians"
    //% subcategory="Trigonometry"
    //% group="Hyperbolic"
    //% color=#2ECC71
    export function coth(radians: number): number {
        let tanh = MathX.tanh(radians)

        if (tanh == 0) return 0

        return 1 / tanh
    }

    /**
     * Returns the hyperbolic secant of an angle.
     * Hyperbolic secant is the reciprocal of hyperbolic cosine.
     * @param radians number
     */
    //% blockId=mathx_sech
    //% block="hyperbolic secant of $radians"
    //% subcategory="Trigonometry"
    //% group="Hyperbolic"
    //% color=#2ECC71
    export function sech(radians: number): number {
        return 1 / MathX.cosh(radians)
    }

    /**
     * Returns the hyperbolic cosecant of an angle.
     * Hyperbolic cosecant is the reciprocal of hyperbolic sine.
     * @param radians number
     */
    //% blockId=mathx_csch
    //% block="hyperbolic cosecant of $radians"
    //% subcategory="Trigonometry"
    //% group="Hyperbolic"
    //% color=#2ECC71
    export function csch(radians: number): number {
        let sinh = MathX.sinh(radians)

        if (sinh == 0) return 0

        return 1 / sinh
    }

    /**
     * Returns the inverse sine (arcsine) of a value.
     * @param x number
     */
    //% blockId=mathx_arcsine
    //% block="arcsine of $x"
    //% subcategory="Trigonometry"
    //% group="Inverse"
    //% color=#2ECC71
    export function arcsine(x: number): number {
        return Math.asin(x)
    }

    /**
     * Returns the inverse cosine (arccosine) of a value.
     * @param x number
     */
    //% blockId=mathx_arccosine
    //% block="arccosine of $x"
    //% subcategory="Trigonometry"
    //% group="Inverse"
    //% color=#2ECC71
    export function arccosine(x: number): number {
        return Math.acos(x)
    }
    /**
    * Returns the inverse cotangent (arccotangent) of a value.
    * @param x number
    */
    //% blockId=mathx_arccotangent
    //% block="arccotangent of $x"
    //% subcategory="Trigonometry"
    //% group="Inverse"
    //% color=#2ECC71
    export function arccotangent(x: number): number {
        if (x == 0) return Math.PI / 2
        return Math.atan(1 / x)
    }

    /**
     * Returns the inverse secant (arcsecant) of a value.
     * @param x number
     */
    //% blockId=mathx_arcsecant
    //% block="arcsecant of $x"
    //% subcategory="Trigonometry"
    //% group="Inverse"
    //% color=#2ECC71
    export function arcsecant(x: number): number {
        if (Math.abs(x) < 1) return NaN
        return Math.acos(1 / x)
    }

    /**
     * Returns the inverse cosecant (arccosecant) of a value.
     * @param x number
     */
    //% blockId=mathx_arccosecant
    //% block="arccosecant of $x"
    //% subcategory="Trigonometry"
    //% group="Inverse"
    //% color=#2ECC71
    export function arccosecant(x: number): number {
        if (Math.abs(x) < 1) return NaN
        return Math.asin(1 / x)
    }
    /**
     * Converts degrees to radians.
     * @param degrees number
     */
    //% blockId=mathx_degrees_to_radians
    //% block="degrees $degrees to radians"
    //% subcategory="Trigonometry"
    //% group="Angle Conversion"
    export function degreesToRadians(degrees: number): number {
        return degrees * Math.PI / 180
    }

    /**
     * Converts radians to degrees.
     * @param radians number
     */
    //% blockId=mathx_radians_to_degrees
    //% block="radians $radians to degrees"
    //% subcategory="Trigonometry"
    //% group="Angle Conversion"
    export function radiansToDegrees(radians: number): number {
        return radians * 180 / Math.PI
    }
    /**
     * Normalizes an angle to the range [0, 360).
     * @param degrees number
     */
    //% blockId=mathx_normalize_angle
    //% block="normalize angle $degrees"
    //% subcategory="Trigonometry"
    //% group="Angle Conversion"
    //% color=#2ECC71
    export function normalizeAngle(degrees: number): number {
        degrees %= 360

        if (degrees < 0)
            degrees += 360

        return degrees
    }

    /**
     * Returns the smallest difference between two angles.
     * @param angle1 number
     * @param angle2 number
     */
    //% blockId=mathx_angle_difference
    //% block="angle difference between $angle1 and $angle2"
    //% subcategory="Trigonometry"
    //% group="Angle Conversion"
    //% color=#2ECC71
    export function angleDifference(angle1: number, angle2: number): number {
        let diff = normalizeAngle(angle2 - angle1)

        if (diff > 180)
            diff -= 360

        return diff
    }
    /**
     * Returns the cotangent of an angle.
     * Cotangent is the reciprocal of tangent.
     * @param radians number
     */
    //% blockId=mathx_cotangent
    //% block="cotangent of $radians"
    //% subcategory="Trigonometry"
    //% group="Reciprocal"
    export function cotangent(radians: number): number {
        let tan = Math.tan(radians)

        if (tan == 0) return 0

        return 1 / tan
    }

    /**
     * Returns the secant of an angle.
     * Secant is the reciprocal of cosine.
     * @param radians number
     */
    //% blockId=mathx_secant
    //% block="secant of $radians"
    //% subcategory="Trigonometry"
    //% group="Reciprocal"
    export function secant(radians: number): number {
        let cos = Math.cos(radians)

        if (cos == 0) return 0

        return 1 / cos
    }

    /**
     * Returns the cosecant of an angle.
     * Cosecant is the reciprocal of sine.
     * @param radians number
     */
    //% blockId=mathx_cosecant
    //% block="cosecant of $radians"
    //% subcategory="Trigonometry"
    //% group="Reciprocal"
    export function cosecant(radians: number): number {
        let sin = Math.sin(radians)

        if (sin == 0) return 0

        return 1 / sin
    }
    /**
     * Sine Wave
     */
    //% blockId=mathx_sine
    //% block="sine wave time $t speed $speed amplitude $amp"
    //% subcategory="Trigonometry"
    //% group="Wave"
    export function sine(t: number, speed: number, amp: number): number {
        return Math.sin(t * speed) * amp
    }

    /**
     * Cosine Wave
     */
    //% blockId=mathx_cosine
    //% block="cosine wave time $t speed $speed amplitude $amp"
    //% subcategory="Trigonometry"
    //% group="Wave"
    export function cosine(t: number, speed: number, amp: number): number {
        return Math.cos(t * speed) * amp
    }

    //% blockId=mathx_wave
    //% block="$type wave time $t speed $speed amplitude $amp"
    //% subcategory="Trigonometry"
    //% group="Wave"
    export function wave(type: WaveType, t: number, speed: number, amp: number): number {
        let x = t * speed
        if (type == WaveType.Sine) return Math.sin(x) * amp
        if (type == WaveType.Cosine) return Math.cos(x) * amp
        return Math.abs(Math.sin(x)) * amp
    }
    /**
     * Return a randomized number always as 
     */
    //% blockId=mathx_rand_except
    //% excluded.shadow="lists_create_with" excluded.defl="math_number"
    //% block="random $min to $max except $excluded"
    //% subcategory="Randomness"
    export function randExcept(min: number, max: number, excluded: number[]): number {
        min = Math.floor(min)
        max = Math.floor(max)
        let options: number[] = []

        for (let i = min; i <= max; i++) {
            if (excluded.indexOf(i) == -1) {
                options.push(i)
            }
        }

        return options[randint(0, options.length - 1)]
    }

    /**
    * Pick a random value from an array, excluding specific values
    */
    //% blockId=mathx_rand_choice_except
    //% list.shadow="lists_create_with" list.defl="math_number"
    //% excluded.shadow="lists_create_with" excluded.defl="math_number"
    //% block="pick random from $list except $excluded"
    //% subcategory="Randomness"
    export function randChoiceExcept(list: number[], excluded: number[]): number {
        let options: number[] = []

        for (let value of list) {
            if (excluded.indexOf(value) == -1) {
                options.push(value)
            }
        }

        if (options.length == 0) return list[0]

        return options[randint(0, options.length - 1)]
    }
    /**
     * Returns a percentage of a number.
     * Example: 25% of 80 returns 20.
     * @param percent number
     * @param value number
     */
    //% blockId=mathx_percent_of
    //% block="$percent% of $value"
    //% subcategory="Randomness"
    //% color=#2ECC71
    export function percentOf(percent: number, value: number): number {
        return value * (percent / 100)
    }

    /**
     * Returns what percent one number is of another.
     * Example: 80 is what percent of 200 returns 40.
     * @param value number
     * @param total number
     */
    //% block="$value is what percent of $total"
    //% blockId=mathx_is_what_percent
    //% subcategory="Randomness"
    //% color=#2ECC71
    export function isWhatPercent(value: number, total: number): number {
        if (total == 0) return 0

        return (value / total) * 100
    }

    /**
     * Increases a number by a percentage.
     * Example: increase 40 by 15% returns 46.
     * @param value number
     * @param percent number
     */
    //% block="increase $value by $percent%"
    //% blockId=mathx_increase_percent
    //% subcategory="Randomness"
    //% color=#2ECC71
    export function increasePercent(value: number, percent: number): number {
        return value * (1 + percent / 100)
    }

    /**
     * Decreases a number by a percentage.
     * Example: decrease 100 by 30% returns 70.
     * @param value number
     * @param percent number
     */
    //% block="decrease $value by $percent%"
    //% blockId=mathx_decrease_percent
    //% subcategory="Randomness"
    //% color=#2ECC71
    export function decreasePercent(value: number, percent: number): number {
        return value * (1 - percent / 100)
    }
    /**
     * Round a number to the amount of digits
     * @param x number to round 
     * @param digits amount of digits to round the number
     */
    //% blockId=mathx_round_with_precision
    //% x.shadow="math_number" x.defl=3.14159 
    //% digits.shadow="math_number" digits.defl=2
    //% block="round $x by $digits digits"
    //% subcategory="Utility"
    export function roundWithPrecision(x: number, digits: number): number {
        return Math.roundWithPrecision(x, digits)
    }

    //---constants---
    /**
    * All constants (PI, Euler's number, etc.)
    * @param c type of constant
    */
    //% blockId=mathx_constants
    //% block
    //% weight=100
    //% group=Constants
    //% subcategory="Advanced Math"
    export function constant(c: Constants): number {
        switch (c) {
            case Constants.PI:
                return 3.141592653589793
                break
            case Constants.E:
                return 2.718281828459045
                break
            case Constants.LN2:
                return 0.6931471805599453
                break
            case Constants.LN10:
                return 2.302585092994046
                break
            case Constants.LOG2E:
                return 1.4426950408889634
                break
            case Constants.LOG10E:
                return 0.4342944819032518
                break
            case Constants.SQRT_1_2:
                return 0.7071067811865476
                break
            case Constants.SQRT2:
                return 1.4142135623730951
                break
            case Constants.TAU:
                return 6.283185307179586
                break
            case Constants.PHI:
                return 1.618033988749895
                break
            case Constants.INV_PI:
                return 0.3183098861837907
                break
            case Constants.TWO_OVER_PI:
                return 0.6366197723675814
                break
            case Constants.HALF_PI:
                return 1.5707963267948966
                break
            case Constants.QUARTER_PI:
                return 0.7853981633974483
                break
            case Constants.RAD_TO_DEG:
                return 57.29577951308232
                break
            case Constants.DEG_TO_RAD:
                return 0.017453292519943295
                break
            case Constants.SQRT3:
                return 1.7320508075688772
                break
            case Constants.CBRT2:
                return 1.2599210498948732
                break
            case Constants.GAMMA:
                return 0.5772156649015329
                break
            case Constants.APERY:
                return 1.2020569031595943
                break
            default:
                return 0
                break

        }
    }

    //% block="e^$x"
    //% subcategory="Advanced Math"
    export function exp(x: number): number {
        return Math.exp(x)
    }

    //% block="log base e of $x"
    //% subcategory="Advanced Math"
    export function ln(x: number): number {
        return Math.log(x)
    }


    //% block="log base 10 of $x"
    //% subcategory="Advanced Math"
    export function log10(x: number): number {
        return Math.log(x) / Math.LN10
    }

    //% block="$x ^ $y"
    //% subcategory="Advanced Math"
    export function pow(x: number, y: number): number {
        return Math.pow(x, y)
    }

    //% block="nth root $x root $n"
    //% subcategory="Advanced Math"
    export function root(x: number, n: number): number {
        return Math.pow(x, 1 / n)
    }

    //% block="$x mod $n"
    //% subcategory="Advanced Math"
    export function mod(x: number, n: number): number {
        return ((x % n) + n) % n
    }

    //% block="fractional part of $x"
    //% subcategory="Advanced Math"
    export function fract(x: number): number {
        return x - Math.floor(x)
    }

    //---Randomness Blocks---

    /**
     * Returns a random decimal from 0 to 1
     */
    //% block="random decimal 0 to 1"
    //% subcategory="Randomness"
    export function rand(): number {
        return Math.random()
    }
    /**
     * Returns true if the percentage is true 
     * @param percent chance
     */
    //% block="random chance $percent %"
    //% subcategory="Randomness"
    export function chance(percent: number): boolean {
        return Math.random() * 100 < percent
    }



    // CUSTOM FUNCTIONS 


    type FormulaFn = (x: number) => number

    let formulas: { [key: string]: FormulaFn } = {}

    /**
     * Start defining a formula
     */
    //% blockId=mathx_define_formula_start
    //% block="define formula $name with input $x"
    //% group="Create"
    //% subcategory="Custom Functions"
    //% name.shadow="text"
    //% x.shadow="variables_get"
    export function defineFormulaStart(name: string, x: string): void {
        formulaVars[name] = x
    }

    /**
     * Set formula result 
     */
    //% blockId=mathx_define_formula_set
    //% block="set formula $name result to $value"
    //% group="Create"
    //% subcategory="Custom Functions"
    //% name.shadow="text"
    //% value.shadow="math_number"
    export function defineFormulaSet(name: string, value: number): void {
        const varName = formulaVars[name] || "x"

        formulas[name] = (input: number) => {
            tempVars[varName] = input
            return value
        }
    }

    /**
     * Evaluate formula
     */
    //% blockId=mathx_eval_formula
    //% block="evaluate formula $name with $x"
    //% group="Run"
    //% subcategory="Custom Functions"
    //% name.shadow="text"
    //% x.shadow="math_number"
    export function evalFormula(name: string, x: number): number {
        let fn = formulas[name]
        if (!fn) return 0
        return fn(x)
    }

    /**
     * Get variable inside formula
     */
    //% blockId=mathx_get_var
    //% block="$name"
    //% group="Variables"
    //% subcategory="Custom Functions"
    //% name.shadow="text"
    export function getVar(name: string): number {
        return tempVars[name] || 0
    }


    //---Number Theory---
    /**
    * Checks if a number is prime.
    * @param x number to check
    */
    //% blockId=mathx_is_prime
    //% block="value $x is prime"
    //% subcategory="Number Theory"
    //% color=#2ECC71
    export function isPrime(x: number): boolean {
        x = Math.floor(x)

        if (x < 2) return false
        if (x == 2) return true
        if (x % 2 == 0) return false

        for (let i = 3; i * i <= x; i += 2) {
            if (x % i == 0)
                return false
        }

        return true
    }
    /**
    * Returns the factorial of a number.
    * @param x number
    */
    //% blockId=mathx_factorial
    //% block="factorial of $x"
    //% subcategory="Number Theory"
    //% color=#2ECC71
    export function factorial(x: number): number {
        if (x < 0) return 0

        x = Math.floor(x)

        let result = 1
        for (let i = 2; i <= x; i++) {
            result *= i
        }

        return result
    }
    /**
    * Checks whether a number is a palindrome.
    * @param x number to check
    */
    //% blockId=mathx_is_palindrome
    //% block="value $x is palindrome"
    //% subcategory="Number Theory"
    //% color=#2ECC71
    export function isPalindrome(x: number): boolean {
        x = Math.abs(Math.floor(x))

        let original = x
        let reversed = 0

        while (x > 0) {
            reversed = reversed * 10 + (x % 10)
            x = Math.idiv(x, 10)
        }

        return original == reversed
    }

    /**
    * Returns the greatest common divisor of two numbers.
    * @param a first number
    * @param b second number
    */
    //% blockId=mathx_gcd
    //% block="gcd of $a and $b"
    //% subcategory="Number Theory"
    //% color=#2ECC71
    export function gcd(a: number, b: number): number {
        a = Math.abs(Math.floor(a))
        b = Math.abs(Math.floor(b))

        while (b != 0) {
            let temp = b
            b = a % b
            a = temp
        }

        return a
    }

    /**
    * Returns the least common multiple of two numbers.
    * @param a first number
    * @param b second number
    */
    //% blockId=mathx_lcm
    //% block="lcm of $a and $b"
    //% subcategory="Number Theory"
    //% color=#2ECC71
    export function lcm(a: number, b: number): number {
        a = Math.abs(Math.floor(a))
        b = Math.abs(Math.floor(b))

        if (a == 0 || b == 0)
            return 0

        return Math.idiv(a * b, gcd(a, b))
    }

    /**
     * Checks if a number is even.
     * @param x number
     */
    //% blockId=mathx_is_even
    //% block="is $x even"
    //% subcategory="Number Theory"
    //% color=#2ECC71
    export function isEven(x: number): boolean {
        return x % 2 == 0
    }

    /**
     * Checks if a number is odd.
     * @param x number
     */
    //% blockId=mathx_is_odd
    //% block="is $x odd"
    //% subcategory="Number Theory"
    //% color=#2ECC71
    export function isOdd(x: number): boolean {
        return x % 2 != 0
    }

    /**
     * Checks if a number is a perfect square.
     * @param x number
     */
    //% blockId=mathx_is_perfect_square
    //% block="is $x a perfect square"
    //% subcategory="Number Theory"
    //% color=#2ECC71
    export function isPerfectSquare(x: number): boolean {
        if (x < 0) return false

        let root = Math.floor(Math.sqrt(x))
        return root * root == x
    }

    /**
     * Checks if a number is a power of two.
     * @param x number
     */
    //% blockId=mathx_is_power_of_two
    //% block="is $x a power of two"
    //% subcategory="Number Theory"
    //% color=#2ECC71
    export function isPowerOfTwo(x: number): boolean {
        if (x <= 0) return false

        return (x & (x - 1)) == 0
    }

    /**
 * Returns the Fibonacci number at a given position.
 * @param x number
 */
    //% blockId=mathx_fibonacci
    //% block="fibonacci of $x"
    //% subcategory="Number Theory"
    //% color=#2ECC71
    export function fibonacci(x: number): number {
        if (x < 0) return 0

        x = Math.floor(x)

        if (x == 0) return 0
        if (x == 1) return 1

        let a = 0
        let b = 1

        for (let i = 2; i <= x; i++) {
            let next = a + b
            a = b
            b = next
        }

        return b
    }

    /**
     * Returns the sum of all digits in a number.
     * @param x number
     */
    //% blockId=mathx_sum_digits
    //% block="sum digits of $x"
    //% subcategory="Number Theory"
    //% color=#2ECC71
    export function sumDigits(x: number): number {
        x = Math.abs(Math.floor(x))

        let sum = 0

        while (x > 0) {
            sum += x % 10
            x = Math.floor(x / 10)
        }

        return sum
    }

    /**
     * Reverses the digits of a number.
     * @param x number
     */
    //% blockId=mathx_reverse_digits
    //% block="reverse digits of $x"
    //% subcategory="Number Theory"
    //% color=#2ECC71
    export function reverseDigits(x: number): number {
        let result = 0
        x = Math.floor(x)

        while (x != 0) {
            let digit = x % 10
            result = result * 10 + digit
            x = Math.floor(x / 10)
        }

        return result
    }

    /**
     * Returns the digital root of a number.
     * @param x number
     */
    //% blockId=mathx_digital_root
    //% block="digital root of $x"
    //% subcategory="Number Theory"
    //% color=#2ECC71
    export function digitalRoot(x: number): number {
        x = Math.abs(Math.floor(x))

        while (x >= 10) {
            x = sumDigits(x)
        }

        return x
    }
}