// script.js
document.addEventListener('DOMContentLoaded', function() {
    const node1Container = document.getElementById('node1');
    const node1Rect = node1Container.getBoundingClientRect();
    const node1Node = node1Container.querySelector('.node');
    const centerNodeRadius = node1Node.offsetWidth / 2;

    // Get the center position of node1
    const center = {
        x: node1Rect.left + node1Rect.width / 2,
        y: node1Rect.top + node1Rect.height / 2
    };

    document.querySelectorAll('.node-container:not(#node1)').forEach(function(nodeContainer) {
        const nodeId = nodeContainer.id;
        const arrowId = 'arrow' + nodeId.slice(4); // Extract the number to match 'arrowX'
        const arrow = document.getElementById(arrowId);
        if (!arrow) return;

        const nodeRect = nodeContainer.getBoundingClientRect();
        const node = nodeContainer.querySelector('.node');
        const nodeRadius = node.offsetWidth / 2;

        // Get the center position of the current node
        const nodeCenter = {
            x: nodeRect.left + nodeRect.width / 2,
            y: nodeRect.top + nodeRect.height / 2
        };

        // Calculate the direction vector from the outer node to the central node
        const dx = center.x - nodeCenter.x;
        const dy = center.y - nodeCenter.y;
        const angle = Math.atan2(dy, dx);
        const totalDistance = Math.sqrt(dx * dx + dy * dy);

        // Adjust the arrow length to start and end at the perimeters
        const adjustedDistance = totalDistance - (centerNodeRadius + nodeRadius);

        // Calculate the starting point of the arrow at the perimeter of the outer node
        const startX = nodeCenter.x + nodeRadius * Math.cos(angle);
        const startY = nodeCenter.y + nodeRadius * Math.sin(angle);

        // Adjust arrow thickness based on node sizes
        const averageRadius = (centerNodeRadius + nodeRadius) / 2;
        const arrowThickness = averageRadius / 5;

        // Set the arrow's dimensions and position
        arrow.style.width = `${adjustedDistance}px`;
        arrow.style.height = `${arrowThickness}px`;
        arrow.style.top = `${startY - arrowThickness / 2}px`;
        arrow.style.left = `${startX}px`;
        arrow.style.transform = `rotate(${angle * 180 / Math.PI}deg)`;
    });
});
