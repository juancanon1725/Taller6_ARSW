package edu.escuelaing.arsw.ASE.app;

/**
 * Represents a mouse click data object.
 */
public class LocationPoint {
    private float x;
    private float y;
    private long timestamp;

    public float getX() {
        return x;
    }

    public void setX(float x) {
        this.x = x;
    }

    public float getY() {
        return y;
    }

    public void setY(float y) {
        this.y = y;
    }

    public long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }

}

