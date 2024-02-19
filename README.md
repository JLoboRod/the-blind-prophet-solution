# The Blind Prophet challenge
The **Blind Prophet** problem involves navigating to a target location without direct visual information about the environment. The only available data at each step is the distance to the target. The challenge is to efficiently determine the target's location and navigate to it using minimal moves.

# The approach
This is a novel algorithm developed to address the "Blind Prophet" challenge. It combines geometric principles, triangulation, and strategic navigation to deduce the target's location and plot an optimal path towards it with a minimal number of moves. This approach is distinguished by its use of indirect information (distance measurements) to solve a complex navigation problem.

# How It Works
1. **Initial Phase (Triangulation)**:

* The algorithm begins with two "fake" moves to generate distance measurements from the target, leveraging these distances to form a geometric basis for triangulation.
* By calculating the differences in distances caused by these moves, it employs a geometric approach to deduce the exact location of the target, effectively solving a two-variable equation system where the variables are the coordinates of the target.

2. **Path Optimization**:
* Once the target's coordinates are known, this algorithm calculates the most efficient path to the target. This phase is characterized by a strategic selection of movements that minimize the total number of steps required to reach the destination.
* The algorithm optimizes the route by dynamically adjusting to the calculated position, ensuring that each move brings it closer to the target in the most efficient manner possible.

# Key Features
* **Efficiency**: Minimizes the number of moves to reach the target by using geometric calculations to directly determine the target's location.
* **Adaptability**: Capable of adjusting its path based on new information obtained during navigation, enhancing its robustness in dynamic environments.
* **Simplicity**: Employs straightforward geometric principles, making it easy to understand and implement.

# Applications
This approach functions as a **The GeoTriangulate Navigator**, so it can be applied in various scenarios where direct observation of the target or environment is not possible but distance measurements are available. Potential applications include robotics navigation in obscured or unknown terrains, search-and-rescue operations in challenging environments, and game AI where entities must find objects or locations with limited information.

# Conclusion
The **GeoTriangulate Navigator** represents a significant advancement in solving navigation problems under constrained information conditions. Its development underscores the potential of geometric and mathematical principles in algorithmic problem-solving and opens new avenues for research and application in fields requiring efficient navigation and location discovery strategies.

# How to test
To try the solution:
* Go [here](http://theblindprophet.com).
* Paste the code from `script.js` in the editor.
* Click on Reset prophet button.
* Enjoy!

